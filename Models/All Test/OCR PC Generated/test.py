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


def find_field(field_name, fields):
    for field in fields:
        if field[0] == field_name:
            return field
    return []


def AbstractThreadFunction(start, end, df):
    path = os.path.abspath(os.getcwd()) + "\\images\\"
    keys = df.columns
    fields = {
        "Name": "Text",
        "Roll Number": "Number",
        "Department": "Checkbox",
        "Date of Birth (DDMMYYYY)": "Date",
        "City": "Text",
        "Year of Passing (School)": "Number",
        "Percentage (School)": "Number",
        "Year of Passing (High School)": "Number",
        "Percentage (High School)": "Number",
        "Technical Skill": "Checkbox",
        "Communication Skill": "Checkbox",
    }

    for fileNum in range(start, end + 1):
        img_path = path + str(fileNum) + ".jpg"
        try:
            fileSize.append(os.path.getsize(img_path))
            img = cv2.imread(img_path)
        except:
            print("ERROR : " + img_path)
            continue

        output = API(
            img,
            key_value_both=True,
            fields=fields,
            isHandwritten=0,
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

    df = pd.read_excel("./Database.xlsx")
    df["Date of Birth (DDMMYYYY)"] = df["Date of Birth (DDMMYYYY)"].dt.strftime(
        "%d%m%Y"
    )

    filesPerThread = 5
    batches = [1, 10, 25, 50, 100]
    # batches = [1]

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

        try:
            print("Total execution time: ", end - start)
            print(
                "Average Filesize: "
                + str((sum(fileSize) / len(fileSize)) / 1000)
                + "kb"
            )
            print("Accuracy: " + str(sum(accuracy) / len(accuracy) * 100) + "%")
            print()
        except:
            print("ERROR")
        accuracy, fileSize = [], []
