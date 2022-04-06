import time
import csv
from pathlib import Path
import pandas as pd
import os
from Levenshtein import distance


def API():
    return [
        ["Phone Number", "9750925074"],
        ["City", "BENGALURU"],
        ["Date (DDMMYYYY)", "24122021"],
        ["Ambiance", [["Satisfactory", 0], ["Good", 1], ["Excellent", 0]]],
        ["Service", [["Satisfactory", 0], ["Good", 1], ["Excellent", 0]]],
        ["Food Quality", [["Satisfactory", 1], ["Good", 0], ["Excellent", 0]]],
        ["Would You Recommend Us to a Friend?", [["Yes", 1], ["No", 0]]],
        ["Tell Us Your Overall Experience", "BACON IS HELLA SALTY "],
    ]


if __name__ == "__main__":
    path = os.path.abspath(os.getcwd()) + "\\Images\\"
    filenames = os.listdir(path)
    batches = [1]
    df = pd.read_excel("./Joey's Cafe Handwritten.xlsx")
    df.drop(["Creator", "Id"], axis=1, inplace=True)
    keys = df.columns
    for batch in batches:
        print("Batch :" + str(batch))
        outputTime = []
        fileSize = []
        accuracy = []
        for i in range(batch):
            img_path = "Images\\" + filenames[i]
            filename = filenames[i][:-4]
            row = df.iloc[i]
            # fileSize.append(os.path.getsize(img_path))
            # start = time.time()
            # output = API(img_path, filename)
        #     end = time.time() - start
        #     outputTime.append(end)

        #     row = df.iloc[i]
        #     currentAccuracy = []
        #     for field in output:
        #         try:
        #             key = str(field[0]).strip()
        #             if key == "":
        #                 continue
        #             if key == "Gender?":
        #                 isMale = False
        #                 if field[1][0][1] == "yes":
        #                     isMale = True
        #                 elif field[1][1][1] == "yes":
        #                     isMale = False
        #                 expectedGender = False
        #                 if expected == "Male":
        #                     expectedGender = True
        #                 if isMale == expectedGender:
        #                     currentAccuracy.append(1)
        #                 else:
        #                     currentAccuracy.append(0)
        #             else:
        #                 expected = str(row[key])
        #                 actual = str(field[1])
        #                 fieldAccuracy = (
        #                     len(expected) - distance(expected, actual)
        #                 ) / len(expected)
        #                 currentAccuracy.append(fieldAccuracy)
        #         except:
        #             currentAccuracy.append(0)
        #     accuracy.append(sum(currentAccuracy) / len(currentAccuracy))
        # print("Total execution time: " + str(sum(outputTime)))
        # print("Average Filesize: " + str((sum(fileSize) / len(fileSize)) / 1000) + "kb")
        # print("Accuracy: " + str(sum(accuracy) / len(accuracy)))
        # print()
    # print(API(img_path, filename))
