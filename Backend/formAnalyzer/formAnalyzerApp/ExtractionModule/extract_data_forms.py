import cv2
import numpy as np
from pathlib import Path
import os
import pandas as pd
from Levenshtein import distance
import threading
from .extraction_api import API

# shared data between threads
results = []
mutex = threading.Lock()


def AbstractThreadFunction(path, start, end, checkbox_fields):

    for fileNum in range(start, end):
        img_path = path + "img" + str(fileNum) + ".jpg"
        img = cv2.imread(img_path, 0)
        output = API(img, key_value_both=True, checkbox_fields=checkbox_fields)

        mutex.acquire()
        results.append(output)
        mutex.release()


def ExtractDataForms(path, checkbox_fields):

    filesPerThread = 5
    numOfFiles = len(os.listdir(path))
    results.clear()

    threads = []
    currFile = 1

    while currFile <= numOfFiles:
        start, end = currFile, min(currFile + filesPerThread, numOfFiles + 1)
        thread = threading.Thread(
            target=AbstractThreadFunction, args=(path, start, end, checkbox_fields)
        )
        threads.append(thread)
        currFile += filesPerThread

    for thread in threads:
        thread.start()

    for thread in threads:
        thread.join()

    return results
