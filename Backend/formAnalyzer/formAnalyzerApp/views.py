from typing import Collection
from django.shortcuts import HttpResponse
from .forms import ProjetForm, TextForm
from .extraction_threading import ExtractKeyValues, API
from .models import Project
from .serializers import ProjectSerializer
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
import pymongo, os, cv2, numpy as np, json
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

# MongoDB database connection
connection_string = "mongodb://vishal2720:1infiniteloop@cluster0-shard-00-00.xgy7f.mongodb.net:27017,cluster0-shard-00-01.xgy7f.mongodb.net:27017,cluster0-shard-00-02.xgy7f.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-2cqg7j-shard-0&authSource=admin&retryWrites=true&w=majority"
client = pymongo.MongoClient(connection_string)
# old_string = "mongodb+srv://vishal2720:1infiniteloop@cluster0.xgy7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
db = client["db"]


@api_view(["POST"])
def extractKeys(request):
    data = request.FILES.get("file")
    path = default_storage.save("tmp/img.jpg", ContentFile(data.read()))

    img_path = r"tmp/img.jpg"
    img = cv2.imread(img_path, 0)
    res = API(img)

    keys = []
    for kv in res:
        if kv[0] != "":
            keys.append(kv[0])

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
        }
    )

    return HttpResponse(projectId)


@api_view(["GET"])
def getAllProjects(request):

    user_id = request.user.id
    collection = db["Projects"]

    res = []

    for ele in collection.find():
        if ele["user_id"] == user_id:
            curr = {"project_id": ele["project_id"], "name": ele["name"]}
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

    collection = db["Project_data"]
    output = ExtractKeyValues(project_id, num)

    for res in output:
        collection.insert_one(res)

    path = os.path.abspath(os.getcwd()) + "//tmp//"
    for filename in os.listdir(path):
        os.remove(path + filename)

    return HttpResponse()
