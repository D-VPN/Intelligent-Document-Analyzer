from textblob import TextBlob

samples = [
    "Amazing customer service.",
    "Love it.",
    "Good price.",
    "What is not to like about this product.",
    "Not bad.",
    "Not an issue.",
    "Not buggy.",
    "Not happy.",
    "Not user-friendly.",
    "Not good.",
    "Is it any good?",
]
for f in samples:
    analysis = TextBlob(f)
    print(analysis.sentiment.polarity)
