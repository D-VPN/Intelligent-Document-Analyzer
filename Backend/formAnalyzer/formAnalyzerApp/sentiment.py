import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle
import os

path = os.path.abspath(os.getcwd())

model = tf.keras.models.load_model(path + "\Model\sentiment_model.h5")
with open(path + "\Model\\tokenizer.pkl", "rb") as inp:
    tokenizer = pickle.load(inp)
sentiment_label = ["positive", "negative"]


def predict_sentence(text):
    tw = tokenizer.texts_to_sequences([text])
    tw = pad_sequences(tw, maxlen=200)
    prediction = int(model.predict(tw).round().item())
    print(sentiment_label[prediction])
    return round(model.predict(tw).item(), 2)


sent = "Worst company to work at"
print(predict_sentence(sent))
