from django.shortcuts import render, HttpResponse
import pymongo

# MongoDB database connection
client = pymongo.MongoClient("mongodb+srv://vishal2720:1infiniteloop@cluster0.xgy7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client["db"]
collection = db["test"]

def home(request):
    collection.insert_one({
        'user_id': 1,
        'task': "First Project",
        'description': "Just some sample project"
    })
    return HttpResponse("Done!")

