import cv2
import numpy as np
import pytesseract


def MultipleChoice(img):
    cv2.imwrite("output/checkbox/checkbox.jpg", img)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    thresh_inv = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

    # Blur the image
    blur = cv2.GaussianBlur(thresh_inv, (1, 1), 0)

    thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
    # find contours
    contours = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[0]

    boxes, res = [], []
    MAX = 0

    for c in contours:
        x, y, w, h = cv2.boundingRect(c)
        if w * h > 1000:
            boxes.append([x, y, w, h])
            checkbox = 255 - img[y + 5 : y + h - 5, x + 5 : x + w - 5]
            MAX = max(MAX, np.sum(checkbox))

    _next = 1
    boxes = sorted(boxes)

    for box in boxes:

        try:
            x, y, w, h = box
            checkbox = 255 - img[y + 5 : y + h - 5, x + 5 : x + w - 5]

            if _next != len(boxes):
                key = img[y : y + h, x + w + 2 : boxes[_next][0] - 1]
            else:
                key = img[y : y + h, x + w + 2 :]

            if MAX == np.sum(checkbox):
                value_text = 1
            else:
                value_text = 0

            key_text = (
                pytesseract.image_to_string(
                    key,
                    lang="eng",
                    config="--psm 7 --oem 3",
                )
                .replace("|", "")
                .replace("\n", " ")
                .replace("\x0c", "")
                .replace("♀", "")
                .strip()
            )

            res.append([key_text, value_text])
        except:
            pass

        _next += 1

    return res
