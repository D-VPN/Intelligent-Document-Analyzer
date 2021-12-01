import cv2
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import csv
from pathlib import Path
import os
try:
    from PIL import Image
except ImportError:
    import Image
import pytesseract
from matplotlib.pyplot import figure


def multiple_choice(parent_path, parent_key, image):

    # converting BGR to Grayscale
    gray_scale = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Binarising image
    th1, img_bin = cv2.threshold(gray_scale, 150, 225, cv2.THRESH_BINARY)
    img_bin = ~img_bin

    line_min_width = 15

    kernal_h = np.ones((1, line_min_width), np.uint8)
    kernal_v = np.ones((line_min_width, 1), np.uint8)

    # finding horizontal lines
    img_bin_h = cv2.morphologyEx(img_bin, cv2.MORPH_OPEN, kernal_h)

    # detect vert lines
    img_bin_v = cv2.morphologyEx(img_bin, cv2.MORPH_OPEN, kernal_v)

    # fix image
    img_bin_final = img_bin_h | img_bin_v

    final_kernel = np.ones((3, 3), np.uint8)
    img_bin_final = cv2.dilate(img_bin_final, final_kernel, iterations=1)

    # getting labels
    ret, labels, stats, centroids = cv2.connectedComponentsWithStats(
        ~img_bin_final, connectivity=8, ltype=cv2.CV_32S)

    extracted_value = []

    # cropping the image
    i = 1
    for x, y, w, h, area in stats[2:]:

        if i != stats[2:].shape[0]:
            value_img = image[y+2:y+h-2, x+2: x+w-2]  # val
            key_x_end = stats[2:][i][0] - 1
            key_img = image[y:y+h, x + w: key_x_end]  # key

        else:
            value_img = image[y+2:y+h-2, x+2: x+w-2]  # val
            key_img = image[y:y+h, x + w:]  # key

        print(np.mean(value_img))
        if np.mean(value_img) >= 253:
            value_text = "no"
        else:
            value_text = "yes"
        key_val = [pytesseract.image_to_string(
            key_img, lang='eng').replace("\n", " ").replace("♀", ""), value_text]

        extracted_value.append(key_val)

        cv2.imwrite(parent_path + "_key_" + str(i) + ".jpg", key_img)
        cv2.imwrite(parent_path + "_value_" + str(i) + ".jpg", value_img)
        i += 1

    return extracted_value
