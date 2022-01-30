from cmath import atan
from typing import Collection
from django.shortcuts import HttpResponse
from .forms import ProjetForm, TextForm
from .ExtractionModule.extract_data_forms import ExtractDataForms
from .ExtractionModule.extract_template_form import ExtractTemplateForm
from .models import Project
from .serializers import ProjectSerializer
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
import pymongo, os, cv2, numpy as np, json, datetime
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

# MongoDB database connection
connection_string = "mongodb://vishal2720:1infiniteloop@cluster0-shard-00-00.xgy7f.mongodb.net:27017,cluster0-shard-00-01.xgy7f.mongodb.net:27017,cluster0-shard-00-02.xgy7f.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-2cqg7j-shard-0&authSource=admin&retryWrites=true&w=majority"
client = pymongo.MongoClient(connection_string)
# old_string = "mongodb+srv://vishal2720:1infiniteloop@cluster0.xgy7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
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
            keys.append(field["valueType"])

    return keys


def getFormCreatedDate(project_id):

    collection = db["Projects"]

    for doc in collection.find({"project_id": project_id}):
        return doc["created_at"]


def getProjectName(project_id):

    collection = db["Projects"]

    for doc in collection.find({"project_id": project_id}):
        return doc["name"]


@api_view(["POST"])
def extractKeys(request):
    data = request.FILES.get("file")
    img_path = r"tmp/img.jpg"

    path = default_storage.save(img_path, ContentFile(data.read()))
    img = cv2.imread(img_path, 0)
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
            "created_at": datetime.datetime.now().isoformat(),
        }
    )

    return HttpResponse(projectId)


@api_view(["POST"])
def projectDelete(request):
    project_id = request.data["project_id"]

    collection = db[project_id]
    doc = {"project_id": project_id}
    collection.delete_one(doc)

    collection = db[project_id]
    collection.drop()


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

    project_id = str(request.user.id) + "_" + request.data.get("name")

    num = 1
    for file in request.data:
        if file == "name":
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

    collection = db[project_id]
    for doc in output:
        res = {"project_id": project_id}
        for kv in doc:
            res[kv[0]] = kv[1]
        collection.insert_one(res)

    for filename in os.listdir(path):
        os.remove(path + filename)

    return HttpResponse()


@api_view(["POST"])
def getProjectMetadata(request):
    print(request.data)
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
