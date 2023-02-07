# pip install lief
import lief

libnative = lief.parse("libtestgadgethook.so") # 287kb
libnative.add_library("frida-gadget-16.0.8-android-arm64.so") # frida-gadget的so文件名，最好改个名字防检测
libnative.write("libtestgadgethook.so")