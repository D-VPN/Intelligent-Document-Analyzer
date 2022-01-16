import cv2
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import time
import csv
from pathlib import Path
import os
from Levenshtein import distance


try:
    from PIL import Image
except ImportError:
    import Image
import pytesseract
from matplotlib.pyplot import figure


def API(img_path, filename):
    img = cv2.imread(img_path, 0)

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
    vertical_lines = cv2.dilate(image_vertical_lines, ver_kernel, iterations=3)

    arr = np.array(vertical_lines)

    MAX = 255
    i = 0
    directory = "output/" + filename
    Path(directory).mkdir(parents=True, exist_ok=True)

    extracted_key_val = []
    while i < len(arr):
        for j in range(len(arr[i])):
            if arr[i][j] == MAX:
                start, end = i, 0
                while arr[i][j] == MAX:
                    i += 1
                end = i - 1
                x1, y1 = 0, start
                x2, y2 = img.shape[1], end
                img_key_val = img[y1:y2, x1:x2]
                temp_img1 = img[y1:y2, x1:j]  # key
                temp_img2 = img[y1 - 2 : y2 + 2, j - 2 : x2 + 2]  # value
                parent_path = (
                    os.path.abspath(os.getcwd())
                    + "\\output\\"
                    + filename
                    + "\\"
                    + str(i)
                    + "_"
                    + str(j)
                )
                save_path1 = (
                    os.path.abspath(os.getcwd())
                    + "\\output\\"
                    + filename
                    + "\\"
                    + str(i)
                    + "_"
                    + str(j)
                    + "1.jpg"
                )

                save_path2 = (
                    os.path.abspath(os.getcwd())
                    + "\\output\\"
                    + filename
                    + "\\"
                    + str(i)
                    + "_"
                    + str(j)
                    + "2.jpg"
                )

                cv2.imwrite(save_path1, temp_img1)
                cv2.imwrite(save_path2, temp_img2)

                key = (
                    pytesseract.image_to_string(temp_img1, lang="eng")
                    .replace("|", "I")
                    .replace("\n", " ")
                    .replace("\x0c", "")
                    .replace("♀", "")
                    .strip()
                )
                if "Gender" in key:
                    value = multiple_choice(parent_path, key, cv2.imread(save_path2))
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
                # print('KEY:', key, '\nVALUE:', value)
                break
        i += 1
    return extracted_key_val
    # print("")
    # print(np.matrix(extracted_key_val))


def multiple_choice(parent_path, parent_key, image):

    ### converting BGR to Grayscale
    gray_scale = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    ### Binarising image
    th1, img_bin = cv2.threshold(gray_scale, 150, 225, cv2.THRESH_BINARY)
    img_bin = ~img_bin

    line_min_width = 15

    kernal_h = np.ones((1, line_min_width), np.uint8)
    kernal_v = np.ones((line_min_width, 1), np.uint8)

    ### finding horizontal lines
    img_bin_h = cv2.morphologyEx(img_bin, cv2.MORPH_OPEN, kernal_h)

    ## detect vert lines
    img_bin_v = cv2.morphologyEx(img_bin, cv2.MORPH_OPEN, kernal_v)

    # fix image
    img_bin_final = img_bin_h | img_bin_v

    final_kernel = np.ones((3, 3), np.uint8)
    img_bin_final = cv2.dilate(img_bin_final, final_kernel, iterations=1)

    ### getting labels
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
            .replace("|", "I")
            .replace("\n", " ")
            .replace("\x0c", "")
            .replace("♀", "")
            .strip(),
            value_text,
        ]

        extracted_value.append(key_val)

        cv2.imwrite(parent_path + "_key_" + str(i) + ".jpg", key_img)
        cv2.imwrite(parent_path + "_value_" + str(i) + ".jpg", value_img)
        i += 1

    return extracted_value


if __name__ == "__main__":
    path = os.path.abspath(os.getcwd()) + "\\images\\"
    filenames = os.listdir(path)
    batches = [1, 5]
    df = pd.read_excel("./data-source.xlsx")
    df["Date Of Birth (DDMMYYYY)"] = df["Date Of Birth (DDMMYYYY)"].dt.strftime(
        "%d%m%Y"
    )
    for batch in batches:
        print("Batch :" + str(batch))
        outputTime = []
        fileSize = []
        accuracy = []
        for i in range(batch):
            img_path = "images\\" + filenames[i]
            filename = filenames[i][:-4]
            fileSize.append(os.path.getsize(img_path))
            start = time.time()
            output = API(img_path, filename)
            end = time.time() - start
            outputTime.append(end)

            row = df.iloc[i]
            currentAccuracy = []
            for field in output:
                try:
                    key = str(field[0]).strip()
                    if key == "":
                        continue
                    if key == "Gender?":
                        isMale = False
                        if field[1][0][1] == "yes":
                            isMale = True
                        elif field[1][1][1] == "yes":
                            isMale = False
                        expectedGender = False
                        if expected == "Male":
                            expectedGender = True
                        if isMale == expectedGender:
                            currentAccuracy.append(1)
                        else:
                            currentAccuracy.append(0)
                    else:
                        expected = str(row[key])
                        actual = str(field[1])
                        fieldAccuracy = (
                            len(expected) - distance(expected, actual)
                        ) / len(expected)
                        currentAccuracy.append(fieldAccuracy)
                except:
                    currentAccuracy.append(0)
            accuracy.append(sum(currentAccuracy) / len(currentAccuracy))
        print("Total execution time: " + str(sum(outputTime)))
        print("Average Filesize: " + str((sum(fileSize) / len(fileSize)) / 1000) + "kb")
        print("Accuracy: " + str(sum(accuracy) / len(accuracy)))
        print()
    # print(API(img_path, filename))
