import pymongo

# MongoDB database connection
connection_string = "mongodb://vishal2720:1infiniteloop@cluster0-shard-00-00.xgy7f.mongodb.net:27017,cluster0-shard-00-01.xgy7f.mongodb.net:27017,cluster0-shard-00-02.xgy7f.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-2cqg7j-shard-0&authSource=admin&retryWrites=true&w=majority"
client = pymongo.MongoClient(connection_string)
# old_string = "mongodb+srv://vishal2720:1infiniteloop@cluster0.xgy7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
db = client["db"]

collection = db["Projects"]
project_id = "1_India 2011"
checkbox_fields = []

for doc in collection.find({"project_id": project_id}):
    for field in doc["fields"]:
        print(field)
        if field["valueType"] == "Checkbox":
            checkbox_fields.append(field["name"])

print(checkbox_fields)
