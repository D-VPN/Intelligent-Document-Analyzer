import cv2
import numpy as np
import pytesseract


def MultipleChoice(image):

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
