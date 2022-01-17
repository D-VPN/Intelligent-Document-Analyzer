import os

path = os.path.abspath(os.getcwd()) + "\\images\\"
print(path)
count = 1
for filename in os.listdir(path):
    os.rename(path + filename, str(count) + ".jpg")
    count = count + 1
