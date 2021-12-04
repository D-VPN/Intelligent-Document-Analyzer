from django.shortcuts import HttpResponse
from .forms import ProjetForm, TextForm
from .extraction_api import API
from .models import Project
from .serializers import ProjectSerializer
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
import pymongo

# MongoDB database connection
connection_string = "mongodb://vishal2720:1infiniteloop@cluster0-shard-00-00.xgy7f.mongodb.net:27017,cluster0-shard-00-01.xgy7f.mongodb.net:27017,cluster0-shard-00-02.xgy7f.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-2cqg7j-shard-0&authSource=admin&retryWrites=true&w=majority"
client = pymongo.MongoClient(connection_string)
# old_string = "mongodb+srv://vishal2720:1infiniteloop@cluster0.xgy7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

db = client["db"]
# collection = db["test"]


def home(request):
    return HttpResponse("Done!")


class CreateProjectView:
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Here all incoming data we kept in serializer variable.
        # Change the data in your way and then pass it inside perform_create()

        print(serializer)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            data={
                "status": 201,
                "message": "Product Successfully Created",
                "data": serializer.data,
            },
            status=status.HTTP_201_CREATED,
            headers=headers,
        )


def textExtraction(request):
    if request.method == "GET":
        form = TextForm()

    if request.method == "POST":
        text_form_image = request.text_form

    return HttpResponse()

@api_view(['POST'])
def projectCreate(request):
	# serializer = ProjectSerializer(data=request.data)
    # serializer = ProjectSerializer(data=request.data)
    # print(serializer)
    print(request.data)


	# if serializer.is_valid():
	# 	serializer.save()

	# return Response(serializer.data)