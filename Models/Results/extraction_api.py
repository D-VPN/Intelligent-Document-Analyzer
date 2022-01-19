from unittest import expectedFailure
import cv2
import numpy as np, pandas as pd, os, time, cv2
import pandas as pd
from pathlib import Path
from Levenshtein import distance
import threading

try:
    from PIL import Image
except ImportError:
    import Image
import pytesseract


def API(img):
    # img = cv2.imread(img_path, 0)

    # thresholding the image to a binary image
    img_bin = cv2.adaptiveThreshold(
        img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2
    )

    # inverting the image
    img_bin = 255 - img_bin

    # countcol(width) of kernel as 100th of total width
    ver_kernel_len = np.array(img).shape[0] // 75

    # Defining a vertical kernel to detect all vertical lines of image
    ver_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, ver_kernel_len))

    # A kernel of 2x2
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2))

    # Use vertical kernel to detect and save the vertical lines in a jpg
    image_vertical_lines = cv2.erode(img_bin, ver_kernel, iterations=3)

    # cv2.imwrite("temp.png", image_vertical_lines)
    vertical_lines = cv2.dilate(image_vertical_lines, ver_kernel, iterations=3)

    arr = np.array(vertical_lines)

    MAX = 255
    i = 0

    extracted_key_val = []
    while i < len(arr):
        # keep in mind the starting point for j, may not work always
        for j in range(len(arr[i]) // 3, len(arr[i])):

            if arr[i][j] == MAX:
                start, end = i, 0
                while arr[i][j] == MAX:
                    i += 1
                end = i - 1

                x1, y1 = 0, start
                x2, y2 = img.shape[1], end
                temp_img1 = img[y1:y2, x1:j]  # key
                temp_img2 = img[y1 - 2 : y2 + 2, j - 2 : x2 + 2]  # value
                cv2.imwrite("key.jpg", temp_img1)
                cv2.imwrite("value.jpg", temp_img2)
                key = (
                    pytesseract.image_to_string(temp_img1, lang="eng")
                    .replace("|", "I")
                    .replace("\n", " ")
                    .replace("\x0c", "")
                    .replace("♀", "")
                    .strip()
                )

                if key == "":
                    break

                if "Gender" in key:
                    value = multiple_choice(temp_img2)
                else:
                    value = (
                        pytesseract.image_to_string(temp_img2, lang="eng")
                        .replace("|", "I")
                        .replace("\n", " ")
                        .replace("\x0c", "")
                        .replace("♀", "")
                        .strip()
                    )
                extracted_key_val.append([key, value])

                # print("KEY:", key, "\nVALUE:", value)

                break
        i += 1
    return extracted_key_val


def multiple_choice(image):

    ### Binarising image
    th1, img_bin = cv2.threshold(image, 150, 225, cv2.THRESH_BINARY)
    img_bin = ~img_bin

    line_min_width = 15

    kernal_h = np.ones((1, line_min_width), np.uint8)
    kernal_v = np.ones((line_min_width, 1), np.uint8)

    # finding horizontal lines
    img_bin_h = cv2.morphologyEx(img_bin, cv2.MORPH_OPEN, kernal_h)

    ## detect vert lines
    img_bin_v = cv2.morphologyEx(img_bin, cv2.MORPH_OPEN, kernal_v)

    # fix image
    img_bin_final = img_bin_h | img_bin_v

    final_kernel = np.ones((3, 3), np.uint8)
    img_bin_final = cv2.dilate(img_bin_final, final_kernel, iterations=1)

    # getting labels
    ret, labels, stats, centroids = cv2.connectedComponentsWithStats(
        ~img_bin_final, connectivity=8, ltype=cv2.CV_32S
    )

    extracted_value = []

    ### cropping the image
    i = 1
    for x, y, w, h, area in stats[2:]:

        if i != stats[2:].shape[0]:
            value_img = image[y + 2 : y + h - 2, x + 2 : x + w - 2]  # val
            key_x_end = stats[2:][i][0] - 1
            key_img = image[y : y + h, x + w : key_x_end]  # key

        else:
            value_img = image[y + 2 : y + h - 2, x + 2 : x + w - 2]  # val
            key_img = image[y : y + h, x + w :]  # key

        # print(np.mean(value_img))
        if np.mean(value_img) >= 253:
            value_text = "no"
        else:
            value_text = "yes"

        key_val = [
            pytesseract.image_to_string(key_img, lang="eng")
            .replace("|", "")
            .replace("\n", " ")
            .replace("\x0c", "")
            .replace("♀", "")
            .strip(),
            value_text,
        ]

        extracted_value.append(key_val)

        for key_val in extracted_value:
            if key_val[1] == "yes":
                return key_val[0]

        i += 1

    return extracted_value


path = os.path.abspath(os.getcwd()) + "\\images\\"

batches = [1, 10, 25, 50, 100]
df = pd.read_excel("./Copy of data-source.xlsx")
columns = df.columns

filenames = [path+str(i)+".jpg" for i in range(101)]

for batch in batches:
    curr_itr = 0
    print("Batch size :", batch)

    outputTime, accuracy, fileSize = [], [], []
    i = 1
    r = batch % 5
    q = (batch-r)/5
    t1_batch = 

    t1 = threading.Thread(target=(),args=())
    t2 = threading.Thread(target=(),args=())
    t3 = threading.Thread(target=(),args=())
    t4 = threading.Thread(target=(),args=())
    t5 = threading.Thread(target=(),args=())
        else:
        img_path = path + str(i) + ".jpg"

        fileSize.append(os.path.getsize(img_path))
        img = cv2.imread(img_path, 0)
        start = time.time()
        output = API(img)
        end = time.time()
        outputTime.append(end - start)

        currentAccuracy = []

        for i in range(len(output)):
            detected_key, detected_value = str(output[i][0]), str(output[i][1])
            expected_key, expected_value = str(columns[i]), df[columns[i]][curr_itr]

            if detected_key == "":                   continue

            if isinstance(expected_value, float):    expected_value = int(expected_value)

            if type(expected_value) is pd.Timestamp: expected_value = expected_value.strftime("%d%m%Y")

            expected_value = str(expected_value)
            if detected_key == "Gender?":
                if detected_value == expected_value: currentAccuracy.append(1)
                else:                                currentAccuracy.append(0)
            else:
                fieldAccuracy = (
                    len(expected_value) - distance(expected_value, detected_value)
                ) / len(expected_value)
                currentAccuracy.append(fieldAccuracy)
        accuracy.append(sum(currentAccuracy) / len(currentAccuracy))
        curr_itr += 1

        if curr_itr == batch:
            break
    print("Total execution time: " + str(sum(outputTime)))
    print("Average Filesize: " + str((sum(fileSize) / len(fileSize)) / 1000) + "kb")
    print("Accuracy: " + str(sum(accuracy) / len(accuracy) * 100) + "%")
    print()
