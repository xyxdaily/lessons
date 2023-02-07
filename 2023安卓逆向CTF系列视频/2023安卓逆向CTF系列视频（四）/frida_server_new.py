'''
pip install flask
https://flask.palletsprojects.com/en/2.2.x/quickstart/#a-minimal-application
set FLASK_APP=frida_server_new.py
flask run --host=0.0.0.0 --port=5004
'''
from flask import Flask,request
import frida
app = Flask(__name__)

def session_scrypt_init():
    global script, session
    # 1. attach
    # session = frida.get_usb_device(timeout=10).attach("LoopAndLoop") # 通过本地方式链接，适合默认端口
    # session = frida.get_remote_device("192.168.7.103:27045").attach("LoopAndLoop")
    # session = frida.get_device_manager().add_remote_device("192.168.0.125:27043").attach("com.sankuai.meituan.takeoutnew")  # 通过ip链接更灵活

    # 2. spawn
    device = frida.get_usb_device(timeout=10)
    pid = device.spawn(["net.bluelotus.tomorrow.easyandroid"])
    session = device.attach(pid)
    device.resume(pid) 

    with open("frida_rpc_new.js", "r",encoding="utf-8") as f:
        source = f.read()

    script = session.create_script(source)
    script.load()

    
    # input("....")

def session_scrypt_finish():
    session.detach()

def mychec(i):
    result = script.exports.chec(i,99)
    print(result)
    return result

@app.route("/chec",methods=['POST', 'GET'])
def chec():
    if request.method == "POST":
        print(request)
        print(request.form)
        i = request.form["i"]
        print("data=",i," typeof i in python",type(i))
        result = mychec(int(i))
        print("check result=",result)
        return result
    else:
        return "you need a POST method"
    # result = mychec(i)
    # return "called chec" + str(result)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/hello")
def hello():
    return "hello"

# if __name__=="__main__":
session_scrypt_init()