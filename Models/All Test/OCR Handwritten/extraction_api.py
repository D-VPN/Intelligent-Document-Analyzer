import os
from urllib import response
import cv2
import numpy as np
import pytesseract
from multiple_choice import *
import boto3
from combine import *


def contains_box(thresh_img, mean):

    # find contours
    contours = cv2.findContours(thresh_img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[
        0
    ]

    for c in contours:
        x, y, w, h = cv2.boundingRect(c)
        if w * h > 1000:
            return True

    return False


def API(img, key_value_both, fields=None, isHandwritten=None):
    if img is None:
        return
    path = os.path.abspath(os.getcwd()) + "\\output"
    img = cv2.resize(img, (720, 1080))

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    thresh_inv = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

    # Blur the image
    blur = cv2.GaussianBlur(thresh_inv, (1, 1), 0)

    thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

    # find contours
    contours = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)[0]

    mask = np.ones(img.shape[:2], dtype="uint8") * 255

    num = 1
    res, area, coordinates = [], [], []

    for c in contours:
        x, y, w, h = cv2.boundingRect(c)
        cv2.rectangle(mask, (x, y), (x + w, y + h), (0, 0, 255), -1)
        coordinates.append([x, y, w, h])
        area.append(w * h)

    mean = np.mean(area)

    images, indices = [], []

    for c in coordinates[::-1]:

        x, y, w, h = c

        if w * h > 1000:

            x1, x2, y1, y2 = x, x + w, y, y + h
            try:
                key_img = img[y1 - 10 : y2 + 10, 0:x1]  # key

                key = (
                    pytesseract.image_to_string(
                        key_img, lang="eng", config="--psm 6 --oem 3"
                    )
                    .replace("|", "")
                    .replace("\n", " ")
                    .replace("\x0c", "")
                    .replace("♀", "")
                    .replace("‘", "")
                    .strip()
                )
            except:
                continue

            if key == "" or contains_box(thresh[y1 - 10 : y2 + 10, 0:x1], mean):
                continue

            if key not in fields.keys():
                continue

            if key_value_both == True:
                if fields[key] == "Checkbox":
                    value_img = img[y1 - 10 : y2 + 10, x1:]
                    value_list = MultipleChoice(value_img)
                    value = ""
                    for pair in value_list:
                        if pair[1] == 1:
                            value = pair[0]
                else:
                    value_img = img[y1 + 10 : y2 - 10, x1 + 10 : x2 - 10]
                    if isHandwritten == 1:
                        value = ""
                        if fields[key] == "Sentiment":
                            encoded_image = cv2.imencode(".png", value_img)[1]
                            imageBytes = bytearray(encoded_image.tobytes())

                            # # Amazon Textract client
                            textract = boto3.client("textract")

                            # # Call Amazon Textract
                            response = textract.detect_document_text(
                                Document={"Bytes": imageBytes}
                            )
                            # TODO remove
                            # # Print detected text
                            for item in response["Blocks"]:
                                if item["BlockType"] == "LINE":
                                    value += item["Text"] + " "
                        else:
                            images.append(value_img)
                            indices.append(len(res))
                    else:
                        value = (
                            pytesseract.image_to_string(value_img, lang="eng")
                            .replace("|", "")
                            .replace("\n", " ")
                            .replace("\x0c", "")
                            .replace("♀", "")
                            .strip()
                        )
                res.append([key, value])
            else:
                res.append(key)

        num += 1

    if len(indices) > 0:
        combined_image = combine(images)

        # amazon api
        encoded_image = cv2.imencode(".png", combined_image)[1]
        imageBytes = bytearray(encoded_image.tobytes())

        # # Amazon Textract client
        textract = boto3.client("textract")

        # # Call Amazon Textract
        response = textract.detect_document_text(Document={"Bytes": imageBytes})

        # # Print detected text
        for item in response["Blocks"]:
            if item["BlockType"] == "LINE":
                if len(indices) > 0:
                    res[indices[0]][1] = item["Text"]
                    indices.pop(0)

    return res
