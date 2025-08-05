from google.cloud import firestore
import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("./sdk_2.json")
firebase_admin.initialize_app(cred)

db = firestore.Client()

# 取数据
docs = db.collection("surveyResponses").limit(100).stream()
for doc in docs:
    print(f"{doc.id} => {doc.to_dict()}")
