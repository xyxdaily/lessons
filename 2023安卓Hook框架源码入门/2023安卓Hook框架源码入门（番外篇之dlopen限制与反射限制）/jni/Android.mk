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
LOCAL_MODULE := hello_c_ndk 
LOCAL_SRC_FILES := hello.c

#shellcode.s
# LOCAL_LDLIBS += -L$(SYSROOT)/usr/lib -llog

#LOCAL_FORCE_STATIC_EXECUTABLE := true

include $(BUILD_EXECUTABLE)