import json

# 讀取 JSON 檔案
with open('converted.json', 'r', encoding='utf-8') as file:
    f2 = open("output.txt", 'w', encoding='utf-8')
    data = json.load(file)

# 遍歷受款人列表，逐行輸出 "{名稱} {編號}"
for 受款人 in data['受款人s']['受款人']:
    名稱 = 受款人['名稱']
    編號 = 受款人['編號']
    print(f"{名稱} {編號}")
    f2.write(f"{名稱} {編號}\n")
f2.close()
