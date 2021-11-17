from django.shortcuts import render, HttpResponse, resolve_url
from .forms import ProjetForm
import pymongo

# MongoDB database connection
client = pymongo.MongoClient("mongodb+srv://vishal2720:1infiniteloop@cluster0.xgy7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client["db"]
# collection = db["test"]

def home(request):
    # collection.insert_one({
    #     'user_id': 1,
    #     'task': "First Project",
    #     'description': "Just some sample project"
    # })
    return HttpResponse("Done!")


def createProject(request):
    if request.method == 'GET':
        form = ProjetForm()
    if request.method == 'POST':
        user_id = request.user.id
        form = ProjetForm(request.POST)
        print(form)
        # collection = db['project']
        # collection.insert_one({
        #     'user_id' : user_id,
        #     'project_name' : form.project_name

        # })
    # return HttpResponse()



