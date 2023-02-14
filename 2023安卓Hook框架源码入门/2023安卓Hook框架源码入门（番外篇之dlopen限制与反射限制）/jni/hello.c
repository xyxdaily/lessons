#include <jni.h>
JNIEXPORT jstring JNICALL
Java_com_lovexyx2020_buildso_MainActivity_stringFromJNI(
        JNIEnv* env,
        jobject /* this */) {
    char* hello = "Hello from C++";
    return (*env)->NewStringUTF(env,hello);
}

int main(){
    printf("hello from hello.cpp\n");
    return 0;
}