import requests

url = "http://127.0.0.1:5004/chec"
data = {
    "i":20000,
}

res = requests.post(url,data=data)
print(res.text)