import cv2
import numpy as np
from pathlib import Path
import os
import pandas as pd
from Levenshtein import distance
import threading
from .extraction_api_v2 import API

# shared data between threads
results = []
mutex = threading.Lock()


def AbstractThreadFunction(path, start, end, checkbox_fields, isHandwritten):

    for fileNum in range(start, end):
        img_path = path + "img" + str(fileNum) + ".jpg"
        img = cv2.imread(img_path)
        output = API(
            img,
            key_value_both=True,
            checkbox_fields=checkbox_fields,
            isHandwritten=isHandwritten,
        )

        mutex.acquire()
        results.append(output)
        mutex.release()


def ExtractDataForms(path, checkbox_fields, isHandwritten):

    filesPerThread = 5
    numOfFiles = len(os.listdir(path))
    results.clear()

    threads = []
    currFile = 1

    while currFile <= numOfFiles:
        start, end = currFile, min(currFile + filesPerThread, numOfFiles + 1)
        thread = threading.Thread(
            target=AbstractThreadFunction,
            args=(path, start, end, checkbox_fields, isHandwritten),
        )
        threads.append(thread)
        currFile += filesPerThread

    for thread in threads:
        thread.start()

    for thread in threads:
        thread.join()

    return results
