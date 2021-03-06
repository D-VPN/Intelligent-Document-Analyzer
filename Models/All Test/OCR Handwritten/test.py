import time
import csv
from pathlib import Path
import pandas as pd
import os
import cv2
from Levenshtein import distance
import threading
from extraction_api import *


accuracy, fileSize = [], []
mutex = threading.Lock()


# def API(img, key_value_both, fields=None, isHandwritten=None):
#     return [
#         ["Name", "MAXIMILIAN THOMAS"],
#         ["Phone Number", "9981170856"],
#         ["City", "Pune"],
#         ["Date (DDMMYYYY)", "24092021"],
#         ["Ambiance", "Satisfactory"],
#         ["Service", "Good"],
#         ["Food Quality", "Excellent"],
#         ["Would You Recommend Us to a Friend?", "Yes"],
#         [
#             "Tell Us Your Overall Experience",
#             "ALSO I FEEL LIKE THE CHIPS ARE BOUGHT NOT MADE IN HOUSE",
#         ],
#     ]


def find_field(field_name, fields):
    for field in fields:
        if field[0] == field_name:
            return field
    return []


def AbstractThreadFunction(start, end, df):
    path = os.path.abspath(os.getcwd()) + "\\Images2\\"
    keys = df.columns
    fields = {
        "Name": "Text",
        "Phone Number": "Number",
        "City": "Text",
        "Date (DDMMYYYY)": "Date",
        "City": "Text",
        "Ambiance": "Checkbox",
        "Service": "Checkbox",
        "Food Quality": "Checkbox",
        "Would You Recommend Us to a Friend?": "Checkbox",
        "Tell Us Your Overall Experience": "Sentiment",
    }

    for fileNum in range(start, end + 1):
        img_path = path + str(fileNum) + ".jpg"
        print(img_path)
        try:
            fileSize.append(os.path.getsize(img_path))
            img = cv2.imread(img_path)
        except:
            continue

        output = API(
            img,
            key_value_both=True,
            fields=fields,
            isHandwritten=1,
        )

        currentAccuracy = []
        row = df.iloc[fileNum - 1]

        for field in fields:
            key_value = find_field(field, output)
            if len(key_value) == 0:
                currentAccuracy.append(0)
            else:
                value_type = fields[field]
                if (
                    value_type == "Text"
                    or value_type == "Number"
                    or value_type == "Date"
                    or value_type == "Sentiment"
                ):
                    expected = str(row[field]).lower()
                    actual = str(key_value[1]).lower()
                    fieldAccuracy = (len(expected) - distance(expected, actual)) / len(
                        expected
                    )
                    currentAccuracy.append(fieldAccuracy)
                elif value_type == "Checkbox":
                    if key_value[1] == row[field]:
                        currentAccuracy.append(1)
                    else:
                        currentAccuracy.append(0)
        accuracy.append(sum(currentAccuracy) / len(currentAccuracy))


if __name__ == "__main__":

    df = pd.read_excel("./Joey's Cafe Handwritten.xlsx")
    df.drop(["Creator", "Id"], axis=1, inplace=True)

    filesPerThread = 5
    # batches = [1, 10, 25, 50, 100]
    batches = [1]

    for batch in batches:
        print("Batch: ", batch)

        threads = []
        i = 1
        while i <= batch:
            start, end = i, min(i + filesPerThread, batch)
            thread = threading.Thread(
                target=AbstractThreadFunction, args=(start, end, df)
            )
            threads.append(thread)
            i += filesPerThread

        start = time.time()

        for thread in threads:
            thread.start()

        for thread in threads:
            thread.join()

        end = time.time()

        print("Total execution time: ", end - start)
        print("Average Filesize: " + str((sum(fileSize) / len(fileSize)) / 1000) + "kb")
        print("Accuracy: " + str(sum(accuracy) / len(accuracy) * 100) + "%")
        print()

        accuracy, fileSize = [], []
