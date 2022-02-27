import sys
from PIL import Image


def combine(images):
    images = [Image.open(x) for x in names]

    widths = [img.size[0] for img in images]
    heights = [img.size[1] for img in images]

    max_width = max(widths)
    total_height = sum(heights) + 100

    new_im = Image.new("RGB", (max_width, total_height))

    y_offset = 0
    for im in images:
        new_im.paste(im, (0, y_offset))
        y_offset += im.size[1] + 5

    new_im.save("test.jpg")
