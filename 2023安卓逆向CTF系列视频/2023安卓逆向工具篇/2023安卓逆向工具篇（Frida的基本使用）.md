## frida server
``` 
cd /data/local/tmp
chmod 777 *
./frida-server-16.0.8-android-arm64
./frida-server-16.0.8-android-arm64 -l 0.0.0.0:1314

1. attach
adb devices
frida -D 936AX05033 -F
frida -UF
frida -U -n 设置
frida -U -N com.android.settings

2. spawn
frida -U -f com.android.settings --no-pause 
```



## frida gadget
```python
# pip install lief
# pm path com.example.testgadgethook
import lief

libnative = lief.parse("libtestgadgethook.so") # 287kb
libnative.add_library("frida-gadget-16.0.8-android-arm64.so") # frida-gadget的so文件名，最好改个名字防检测
libnative.write("libtestgadgethook.so")
```
App需要网络权限
```
<uses-permission android:name="android.permission.INTERNET"/>
```

## frida inject
```
./frida-inject-16.0.8-android-arm64 -f com.android.settings -s hello.js
./frida-inject-16.0.8-android-arm64 -p pid -s hello.js
```


## frida gum



## 参考资料
1. [多种姿势花样使用Frida注入](https://ashenone66.cn/2021/09/20/duo-chong-zi-shi-hua-yang-shi-yong-frida-zhu-ru/)
2. [Frida源码分析](https://mabin004.github.io/2018/07/31/Mac%E4%B8%8A%E7%BC%96%E8%AF%91Frida/)
3. [Frida Internal - Part 1: 架构、Gum 与 V8](https://mp.weixin.qq.com/s/P6WGhDL3b4qB-edyc4hpXg)
4. [从Frida源码学习ArtHook（一）](https://github.com/wuhx/AppInspect/wiki/%E4%BB%8EFrida%E6%BA%90%E7%A0%81%E5%AD%A6%E4%B9%A0ArtHook%EF%BC%88%E4%B8%80%EF%BC%89)
5. [[原创]frida源代码分析--进程注入和server dbus通讯架构分析](https://bbs.kanxue.com/thread-270305.htm)
