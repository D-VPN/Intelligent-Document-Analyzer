import cv2
import numpy as np
import pytesseract
from .multiple_choice import MultipleChoice


def API(img, key_value_both, checkbox_fields=None):

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
    res = []

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
                try:
                    temp_img1 = img[y1:y2, x1:j]  # key
                    temp_img2 = img[y1 - 2 : y2 + 2, j - 2 : x2 + 2]  # value

                    key = (
                        pytesseract.image_to_string(temp_img1, lang="eng")
                        .replace("|", "I")
                        .replace("\n", " ")
                        .replace("\x0c", "")
                        .replace("♀", "")
                        .strip()
                    )
                except:
                    continue

                if key == "":
                    break

                if key_value_both == True:
                    if key in checkbox_fields:
                        value = MultipleChoice(temp_img2)
                    else:
                        value = (
                            pytesseract.image_to_string(temp_img2, lang="eng")
                            .replace("|", "I")
                            .replace("\n", " ")
                            .replace("\x0c", "")
                            .replace("♀", "")
                            .strip()
                        )
                    res.append([key, value])
                else:
                    res.append(key)

                # print("KEY:", key, "\nVALUE:", value)
        i += 1

    return res
