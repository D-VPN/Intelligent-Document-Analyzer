import sys
from PIL import Image
import numpy as np
import os


def combine(images):
    images = [Image.fromarray(img) for img in images]

    widths = [img.size[0] for img in images]
    heights = [img.size[1] for img in images]

    max_width = max(widths)
    total_height = sum(heights) + 100

    new_im = Image.new("RGB", (max_width, total_height))

    y_offset = 0
    for im in images:
        new_im.paste(im, (0, y_offset))
        y_offset += im.size[1] + 20

    path = os.path.abspath(os.getcwd()) + "\\Models\OutputTest\output"

    new_im.save(path+"\\combined_image.jpg")
    result_image = np.asarray(new_im)
    return result_image
