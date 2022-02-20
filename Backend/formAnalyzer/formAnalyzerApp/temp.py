import pymongo, pandas, json
from decouple import config
import datetime

# MongoDB database connection
connection_string = config("MONGO")
client = pymongo.MongoClient(connection_string)
db = client["db"]

project_id = "1_Hydrogen"
col = db[project_id]


def getValueType(project_id, key):

    collection = db["Projects"]

    for doc in collection.find({"project_id": project_id}):
        for field in doc["fields"]:
            if field["name"] == key:
                return field["valueType"]

    return None


# make an API call to the MongoDB server
cursor = col.find()

# extract the list of documents from cursor obj
mongo_docs = list(cursor)

# create an empty DataFrame for storing documents
docs = pandas.DataFrame(columns=[])

# iterate over the list of MongoDB dict documents
for num, doc in enumerate(mongo_docs):

    # convert ObjectId() to str
    doc["_id"] = str(doc["_id"])

    for field in doc:
        valueType = getValueType(project_id, field)
        if valueType == "Checkbox":
            for options in doc[field]:
                if options[1] == "yes":
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

    print(doc)
    print()
    # get document _id from dict
    doc_id = doc["_id"]

    del doc["_id"]
    del doc["project_id"]

    # create a Series obj from the MongoDB dict
    series_obj = pandas.Series(doc, name=doc_id)

    # append the MongoDB Series obj to the DataFrame obj
    docs = docs.append(series_obj)

docs.to_csv("data.csv", ",")
