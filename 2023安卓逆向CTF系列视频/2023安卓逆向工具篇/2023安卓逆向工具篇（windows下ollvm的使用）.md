## 如何使用ollvm保护自己的程序

1. 第一步，替换ndk路径下X:\android-config-files\Sdk\ndk\25.0.8775105\toolchains\llvm\prebuilt\windows-x86_64\bin下的clang.exe,clang++.exe,clang-cl.exe
2. 把X:\android-config-files\Sdk\ndk\25.0.8775105\toolchains\llvm\prebuilt\windows-x86_64\lib64\clang下面的不是13.0.1的文件夹复制到X:\android-config-files\Sdk\ndk\25.0.8775105\toolchains\llvm\prebuilt\windows-x86_64\lib\clang下，然后改名为13.0.1
3. 把缺失的头文件加进来
4. SET(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -flegacy-pass-manager -mllvm -bcf -mllvm -sub -mllvm -fla -mllvm -sobf -mllvm -split  -fvisibility=hidden")




## 参考链接
1. [一种高端的APP代码保护方案](https://mp.weixin.qq.com/s/QvEB2Nvoluj8G4Z97f8w5A)

2. [跟着铁头干混淆2 ubuntu20.04编译ollvm](https://www.jianshu.com/p/9136f7257e46)

3. [OLLVM混淆学习（0）——环境搭建及混淆初体验](https://jev0n.com/2022/07/07/ollvm-0.html)

4. [OLLVM混淆学习（1）——控制流平坦化（FLA）](https://jev0n.com/2022/07/08/ollvm-1.html)

5. [https://bbs.pediy.com/thread-271271.htm]([原创]一种将LLVM Pass集成到NDK中的通用方法)

6. [[分享]ollvm反混淆学习 ](https://bbs.pediy.com/thread-269441.htm)
7. [使用unidbg去ollvm虚假分支反混淆](http://missking.cc/2021/05/04/ollvm2/)

8. [使用Ghidra P-Code对OLLVM控制流平坦化进行反混淆](http://galaxylab.pingan.com.cn/%E4%BD%BF%E7%94%A8ghidra-p-code%E5%AF%B9ollvm%E6%8E%A7%E5%88%B6%E6%B5%81%E5%B9%B3%E5%9D%A6%E5%8C%96%E8%BF%9B%E8%A1%8C%E5%8F%8D%E6%B7%B7%E6%B7%86/)

9. [【LLVM奶妈式教学-1】LLVM从安装到手写第一个pass 【hello llvm】](https://blog.csdn.net/qq_41645482/article/details/120265194)