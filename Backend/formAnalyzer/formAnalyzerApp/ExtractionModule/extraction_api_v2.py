import os
import cv2
import numpy as np
import pytesseract
from .multiple_choice_v2 import MultipleChoice


def contains_box(thresh_img, mean):

    # find contours
    contours = cv2.findContours(thresh_img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[
        0
    ]

    for c in contours:
        x, y, w, h = cv2.boundingRect(c)
        if w * h > mean:
            return True

    return False


def API(img, key_value_both, checkbox_fields=None):

    if img is None:
        return

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    thresh_inv = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

    # Blur the image
    blur = cv2.GaussianBlur(thresh_inv, (1, 1), 0)

    thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

    # find contours
    contours = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)[0]

    # mask = np.ones(img.shape[:2], dtype="uint8") * 255

    num = 1
    res, area, coordinates = [], [], []

    for c in contours:

        x, y, w, h = cv2.boundingRect(c)
        # cv2.rectangle(mask, (x, y), (x + w, y + h), (0, 0, 255), -1)
        coordinates.append([x, y, w, h])
        area.append(w * h)

    mean = np.mean(area)

    for c in coordinates:

        x, y, w, h = c

        if w * h > mean:

            x1, x2, y1, y2 = x, x + w, y, y + h

            try:
                key_img = img[y1 - 10 : y2 + 10, 0:x1]  # key

                key = (
                    pytesseract.image_to_string(
                        key_img, lang="eng", config="--psm 6 --oem 3"
                    )
                    .replace("|", "I")
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

            # cv2.imwrite("tmp/key" + str(num) + ".jpg", key_img)

            if key_value_both == True:

                if key in checkbox_fields:
                    value_img = img[y1 - 10 : y2 + 10, x1:]
                    value = MultipleChoice(value_img)
                else:
                    value_img = img[y1 + 10 : y2 - 10, x1 + 10 : x2 - 10]
                    value = (
                        pytesseract.image_to_string(value_img, lang="eng")
                        .replace("|", "I")
                        .replace("\n", " ")
                        .replace("\x0c", "")
                        .replace("♀", "")
                        .strip()
                    )
                # cv2.imwrite("tmp/value" + str(num) + ".jpg", value_img)
                res.append([key, value])
            else:
                res.append(key)

        num += 1

    # res_final = cv2.bitwise_and(img, img, mask=cv2.bitwise_not(mask))

    # cv2.imwrite("tmp/boxes.jpg", mask)
    # cv2.imwrite("tmp/final_image.jpg", res_final)

    return res


# if __name__ == "__main__":

#     for filename in os.listdir("rest images/"):
#         img = cv2.imread("rest images/" + filename)
#         print(
#             API(
#                 img,
#                 key_value_both=True,
#                 checkbox_fields=[
#                     "Ambiance",
#                     "Staff Politeness",
#                     "Food Quality",
#                     "Would You Recommend Us To A Friend?",
#                 ],
#             )
#         )
#         break

# img = cv2.imread("tmp/value18.jpg")
# print(MultipleChoice(img))
