import codecs
import frida

def on_message(message, data):
    if message['type'] == 'send':
        print("message type send =>",message['payload'])
    elif message['type'] == 'error':
        print(message['stack'])

# dumpsys activity top | grep TASK
session = frida.get_usb_device(timeout=10).attach('LoopAndLoop') #net.bluelotus.tomorrow.easyandroid
# session = frida.attach('LoopAndLoop') #net.bluelotus.tomorrow.easyandroid
# print(session)
with codecs.open('./agent.js', 'r', 'utf-8') as f:
    source = f.read()
script = session.create_script(source)
script.on('message', on_message)
script.load()
print(script.exports.add(2, 3))
print(script.exports.chec(1, 99))
# print(script.exports.sub(5, 3))
session.detach()