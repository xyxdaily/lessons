## 使用android studio
在app项目下的build.gradle文件中加
```
ndk{
    abiFilters "armeabi-v7a","arm64-v8a","x86","x86_64"
}
```

```cpp
#include <jni.h>
#include <string>

extern "C" JNIEXPORT jstring JNICALL
Java_com_lovexyx2020_buildso_MainActivity_stringFromJNI(
        JNIEnv* env,
        jobject /* this */) {
    std::string hello = "Hello from C++";
    return env->NewStringUTF(hello.c_str());
}
```

```c
#include <jni.h>
JNIEXPORT jstring JNICALL
Java_com_lovexyx2020_buildso_MainActivity_stringFromJNI(
        JNIEnv* env,
        jobject /* this */) {
    char* hello = "Hello from C++";
    return (*env)->NewStringUTF(env,hello);
}
```

## 使用clang
### 设置环境变量
1. 临时环境变量
set path=X:\android-config-files\Sdk\ndk\25.0.8775105\toolchains\llvm\prebuilt\windows-x86_64\bin
set path=%path%;X:\android-config-files\Sdk\ndk\25.0.8775105\toolchains\llvm\prebuilt\windows-x86_64\bin
aarch64-linux-android31-clang++ hello.cpp -o hello
aarch64-linux-android26-clang++ hello.cpp -shared -o hello
aarch64-linux-android26-clang hello.c -shared -o hello.so
aarch64-linux-android26-clang hello.c  -o hello_c

2. 永久环境变量

## 使用ndk-build

1. 配置Android.mk
```makefile
# # 一个Android.mk file首先必须定义好LOCAL_PATH变量。
# # 它用于在开发树中查找源文件。在这个例子中，宏函数’my-dir’, 
# # 由编译系统提供，用于返回当前路径（即包含Android.mk file文件的目录）。
# LOCAL_PATH := $(call my-dir)
# # CLEAR_VARS由编译系统提供，
# # 指定让GNU MAKEFILE为你清除许多LOCAL_XXX变量（例如 LOCAL_MODULE, LOCAL_SRC_FILES, LOCAL_STATIC_LIBRARIES, 等等...),除LOCAL_PATH 。这是必要的，
# # 因为所有的编译控制文件都在同一个GNU MAKE执行环境中，所有的变量都是全局的。
# include $(CLEAR_VARS)
# # LOCAL_MODULE变量必须定义，以标识你在Android.mk文件中描述的每个模块。名称必须是唯一的，而且不包含任何空格。
# # 注意编译系统会自动产生合适的前缀和后缀，换句话说，一个被命名为'foo'的共享库模块，将会生成'libfoo.so'文件。
# LOCAL_MODULE    := inject
# # LOCAL_SRC_FILES变量必须包含将要编译打包进模块中的C或C++源代码文件。注意，你不用在这里列出头文件和包含文件，
# # 因为编译系统将会自动为你找出依赖型的文件；仅仅列出直接传递给编译器的源代码文件就好。
# LOCAL_SRC_FILES := inject.c
# # BUILD_EXECUTABLE 表示以一个可执行程序的方式进行编译
# # BUILD_SHARED_LIBRARY 表示动态链接库的方式进行编译
# include $(BUILD_EXECUTABLE)

LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)
LOCAL_MODULE := native-lib 
LOCAL_SRC_FILES := native-lib.c

#shellcode.s
# LOCAL_LDLIBS += -L$(SYSROOT)/usr/lib -llog

#LOCAL_FORCE_STATIC_EXECUTABLE := true

include $(BUILD_SHARED_LIBRARY)
```

2. 配置Application.mk
