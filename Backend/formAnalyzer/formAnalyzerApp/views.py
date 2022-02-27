from cmath import atan
from typing import Collection
from django.shortcuts import HttpResponse
from .forms import ProjetForm, TextForm
from .ExtractionModule.extract_data_forms import ExtractDataForms
from .ExtractionModule.extract_template_form import ExtractTemplateForm
from .models import Project
from .serializers import ProjectSerializer
from .sentiment import predict_sentence
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
import pymongo, os, cv2, numpy as np, json, datetime, pandas
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from decouple import config

# MongoDB database connection
connection_string = config("MONGO")
client = pymongo.MongoClient(connection_string)
db = client["db"]

# helper function
def getCheckboxFields(project_id):

    collection = db["Projects"]
    checkbox_fields = []

    for doc in collection.find({"project_id": project_id}):
        for field in doc["fields"]:
            if field["valueType"] == "Checkbox":
                checkbox_fields.append(field["name"])

    return checkbox_fields


def getFormKeys(project_id):

    collection = db["Projects"]
    keys = []

    for doc in collection.find({"project_id": project_id}):
        for field in doc["fields"]:
            keys.append(field["name"])

    return keys


def getFormCreatedDate(project_id):

    collection = db["Projects"]

    for doc in collection.find({"project_id": project_id}):
        return doc["created_at"]


def processDateValues(values):

    res = []
    for val in values:
        day, month, year = int(val[:2]), int(val[2:4]), int(val[4:])
        date = datetime.datetime(year, month, day)
        res.append(date.isoformat())

    return res


def processCheckboxValues(values):

    res = dict()

    for val in values:
        for keys in val:
            if keys[0] in res:
                res[keys[0]] += 1 if keys[1] == 1 else 0
            else:
                res[keys[0]] = 1 if keys[1] == 1 else 0

    return res


def getProjectName(project_id):

    collection = db["Projects"]

    for doc in collection.find({"project_id": project_id}):
        return doc["name"]


def findValueType(project_id, key):

    collection = db["Projects"]

    for doc in collection.find():
        if doc["project_id"] == project_id:
            for field in doc["fields"]:
                if field["name"] == key:
                    return field["valueType"]

    return None


def get_sentiment_keys(project_id):

    collection = db["Projects"]
    sentiment_keys = []

    for doc in collection.find({"project_id": project_id}):
        for kv in doc["fields"]:
            if (kv["valueType"]) == "Sentiment":
                sentiment_keys.append(kv["name"])

    return sentiment_keys


def processSentimentValues(values):

    positive = {"sentiment": [], "data": []}
    negative = {"sentiment": [], "data": []}
    print(values)
    for data in values:
        if data[1] < 0.5:
            positive["sentiment"].append(data[1])
            positive["data"].append(data[0])
        else:
            negative["sentiment"].append(data[1])
            negative["data"].append(data[0])

    res = [positive, negative]
    return res


def getValueType(project_id, key):

    collection = db["Projects"]

    for doc in collection.find({"project_id": project_id}):
        for field in doc["fields"]:
            if field["name"] == key:
                return field["valueType"]

    return None


########################################################


@api_view(["POST"])
def extractKeys(request):
    data = request.FILES.get("file")
    img_path = r"tmp/img.jpg"

    path = default_storage.save(img_path, ContentFile(data.read()))
    img = cv2.imread(img_path)
    keys = ExtractTemplateForm(img)

    json_object = json.dumps(keys)
    os.remove(img_path)

    return HttpResponse(json_object)


@api_view(["POST"])
def projectCreate(request):
    projectId = str(request.user.id) + "_" + str(request.data["name"])
    collection = db["Projects"]

    collection.insert_one(
        {
            "project_id": projectId,
            "user_id": request.user.id,
            "name": request.data["name"],
            "fields": request.data["fields"],
            # "isHandwritten": request.data["isHandwritten"],
            "created_at": datetime.datetime.now().isoformat(),
        }
    )

    return HttpResponse(projectId)


@api_view(["DELETE"])
def projectDelete(request):
    project_id = request.GET.get("project_id", "")
    collection = db["Projects"]
    collection.delete_one({"project_id": project_id})

    collection = db[project_id]
    collection.drop()

    return HttpResponse()


@api_view(["GET"])
def getAllProjects(request):

    user_id = request.user.id
    collection = db["Projects"]

    res = []

    for ele in collection.find():
        if ele["user_id"] == user_id:
            curr = {
                "project_id": ele["project_id"],
                "name": ele["name"],
                "created_at": ele["created_at"],
            }
            res.append(curr)

    json_object = json.dumps(res)
    return HttpResponse(json_object)


@api_view(["POST"])
def uploadForms(request):

    project_id = request.data.get("project_id")

    num = 1
    for file in request.data:
        if file == "project_id":
            continue
        else:
            img = request.data.get(file)
            path = default_storage.save(
                "tmp/img" + str(num) + ".jpg", ContentFile(img.read())
            )
            num += 1

    path = os.path.abspath(os.getcwd()) + "//tmp//"
    checkbox_fields = getCheckboxFields(project_id)
    output = ExtractDataForms(path, checkbox_fields)
    sentiment_keys = get_sentiment_keys(project_id)

    collection = db[project_id]

    for doc in output:
        res = {"project_id": project_id}
        for kv in doc:
            if kv[0] in sentiment_keys:
                res[kv[0]] = [kv[1], predict_sentence(kv[1])]
            else:
                res[kv[0]] = kv[1]
        collection.insert_one(res)

    for filename in os.listdir(path):
        os.remove(path + filename)

    return HttpResponse()


@api_view(["POST"])
def getProjectMetadata(request):

    project_id = request.data["project_id"]
    collection = db[project_id]

    number_of_forms = collection.find().count()
    keys = getFormKeys(project_id)
    created_at = getFormCreatedDate(project_id)
    name = getProjectName(project_id)

    res = {
        "created_at": created_at,
        "number_of_forms": number_of_forms,
        "keys": keys,
        "name": name,
    }
    json_object = json.dumps(res)

    return HttpResponse(json_object)


@api_view(["POST"])
def getVisualizationData(request):

    project_id = request.data["project_id"]
    key = request.data["key"]
    valueType = findValueType(project_id, key)

    values = []
    collection = db[project_id]
    for doc in collection.find():
        values.append(doc[key])

    if valueType == "Date":
        values = processDateValues(values)

    if valueType == "Checkbox":
        values = processCheckboxValues(values)

    if valueType == "Sentiment":
        values = processSentimentValues(values)

    res = {"valueType": valueType, "values": values}

    json_object = json.dumps(res)
    return HttpResponse(json_object)


@api_view(["POST"])
def exportData(request):

    project_id = request.data["project_id"]
    col = db[project_id]
    cursor = col.find()

    mongo_docs = list(cursor)
    docs = pandas.DataFrame(columns=[])

    for num, doc in enumerate(mongo_docs):

        doc["_id"] = str(doc["_id"])

        for field in doc:
            valueType = getValueType(project_id, field)
            if valueType == "Checkbox":
                for options in doc[field]:
                    if options[1] == 1:
                        doc[field] = options[0]
            elif valueType == "Sentiment":
                doc[field] = doc[field][0]
            elif valueType == "Date":
                day, month, year = (
                    int(doc[field][:2]),
                    int(doc[field][2:4]),
                    int(doc[field][4:]),
                )
                doc[field] = datetime.datetime(year, month, day).isoformat()

        doc_id = doc["_id"]

        del doc["_id"]
        del doc["project_id"]

        series_obj = pandas.Series(doc, name=doc_id)
        docs = docs.append(series_obj)

    docs.to_csv("data.csv", ",")
    with open("data.csv") as myfile:
        response = HttpResponse(myfile, content_type="text/csv")
        response["Content-Disposition"] = "attachment; filename=data.csv"
        return response
