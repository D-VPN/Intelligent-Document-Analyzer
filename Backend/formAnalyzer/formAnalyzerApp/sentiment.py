# import tensorflow as tf
# from tensorflow.keras.preprocessing.text import Tokenizer
# from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle
import os
from sklearn.feature_extraction.text import CountVectorizer
from nltk.tokenize import RegexpTokenizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn import metrics

path = os.path.abspath(os.getcwd())
# path = r"D:\Intelligent-Document-Analyzer\Backend\formAnalyzer"

with open(path + "\\formAnalyzerApp\\Model_v2\\model.pkl", "rb") as inp:
    model = pickle.load(inp)

with open(path + "\\formAnalyzerApp\\Model_v2\\cv.pkl", "rb") as inp:
    cv = pickle.load(inp)


def predict_sentence(text):
    val = cv.transform([text])

    # make prediction
    prediction = model.predict(val)[0]
    return int(prediction)
    # if prediction == 0:
    #     return "Negative"
    # else:
    #     return "Positive"
