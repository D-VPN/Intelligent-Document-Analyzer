import cv2
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import csv
import os

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
    os.makedirs(directory)

    while i < len(arr):
        for j in range(len(arr[i])):
            if arr[i][j] == MAX:
                start, end = i, 0
                while arr[i][j] == MAX:
                    i += 1
                end = i - 1
                x1, y1 = 0, start
                x2, y2 = img.shape[1], end
                temp_img1 = img[y1 - 1:y2 + 1, x1 - 1: j - 1]  # key
                temp_img2 = img[y1 - 1:y2 + 1, j + 1: x2]  # value
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

                key = pytesseract.image_to_string(temp_img1)
                value = pytesseract.image_to_string(
                    temp_img2).replace("|", "I")
                print(key, value)
                break
        i += 1


path = os.path.abspath(os.getcwd()) + "\\images\\"
for filename in os.listdir(path):
    API("images\\" + filename, filename[:-4])
