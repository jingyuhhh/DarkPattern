from google.cloud import firestore
import firebase_admin
from firebase_admin import credentials
import pandas as pd

# 初始化 Firebase
cred = credentials.Certificate("./sdk_2.json")
firebase_admin.initialize_app(cred)
db = firestore.Client()

# 取数据
docs = db.collection("surveyResponses").limit(100).stream()

# 转成列表
data = []
for doc in docs:
    row = doc.to_dict()
    row["id"] = doc.id  # 保留文档ID
    data.append(row)

# 转 DataFrame
df = pd.DataFrame(data)

# 保存到本地 xlsx
output_path = "./surveyResponses.xlsx"
df.to_excel(output_path, index=False)

print(f"保存完成: {output_path}")
