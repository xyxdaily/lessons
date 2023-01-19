//
// Created by Admin on 2023-01-16.
//
#include "defs.h"
#include <malloc.h>
#include <stdio.h>
#include <string.h>

int __fastcall GetKey(const unsigned __int8 *a1, int a2, unsigned __int8 *a3)
{
    bool v4; // zf
    int result; // r0
    int v7; // r5
    int i; // r7
    int v9; // r1

    v4 = a1 == 0;
    result = 0;
    if ( !v4 )
        v4 = a3 == 0;
    if ( !v4 )
    {
        do
        {
            a3[result] = result;
            ++result;
        }
        while ( result != 256 );
        v7 = 0;
        for ( i = 0; i != 256; ++i )
        {
            v9 = a3[i];
            v7 = (a1[i % a2] + v7 + v9) % 256;
            a3[i] = a3[v7];
            a3[v7] = v9;
        }
        result = -1;
    }
    return result;
}

int __fastcall RC4(const unsigned __int8 *a1, int a2, const unsigned __int8 *a3, int a4, unsigned __int8 *a5, int *a6)
{
    unsigned __int8 *v6; // r7
    int result; // r0
    bool v12; // zf
    _BYTE *v13; // r6
    int v14; // r1
    int v15; // r0
    int v16; // r2
    int v17; // r3
    char v18; // t1

    result = 0;
    if ( a1 )
    {
        v12 = a3 == 0;
        if ( a3 )
        {
            v6 = a5;
            v12 = a5 == 0;
        }
        if ( !v12 )
        {
            v13 = (_BYTE *)malloc(0x100u);
            if ( GetKey(a3, a4, v13) )
            {
                if ( a2 >= 1 )
                {
                    v14 = 0;
                    v15 = a2;
                    v16 = 0;
                    do
                    {
                        --v15;
                        v16 = (v16 + 1) % 256;
                        v17 = (unsigned __int8)v13[v16];
                        v14 = (v14 + v17) % 256;
                        v13[v16] = v13[v14];
                        v13[v14] = v17;
                        v18 = *a1++;
                        *v6++ = v13[(unsigned __int8)(v17 + v13[v16])] ^ v18;
                    }
                    while ( v15 );
                }
                *a6 = a2;
                free(v13);
                result = -1;
            }
            else
            {
                result = 0;
            }
        }
    }
    return result;
}

char* __fastcall HexToByte(const char *s)
{
    signed int v2; // r5
    char* result; // r0
    int v4; // r6
    int v5; // r1
    unsigned int v6; // r2
    int v7; // r3
    int v8; // r2
    int v9; // r5
    unsigned int v10; // r3
    int v11; // r3

    if ( !s )
        return 0;
    v2 = strlen(s);
    result = 0;
    if ( v2 >= 1 && (v2 & 1) == 0 )
    {
        v4 = v2 / 2;
        result = (char*)malloc(v2 / 2);
        if ( v2 >= 2 )
        {
            v5 = 0;
            while ( 1 )
            {
                v6 = (unsigned __int8)s[2 * v5];
                v7 = 48;
                if ( v6 > 0x40 )
                    v7 = 55;
                v8 = v6 - v7;
                if ( v8 > 15 )
                    break;
                v9 = 48;
                v10 = (unsigned __int8)s[2 * v5 + 1];
                if ( v10 > 0x40 )
                    v9 = 55;
                v11 = v10 - v9;
                if ( v11 > 15 )
                    break;
                *(_BYTE *)(result + v5++) = v11 + 16 * v8;
                if ( v5 >= v4 )
                    return result;
            }
            return 0;
        }
    }
    return result;
}

// 需要导入ida的头文件
unsigned __int8 *__fastcall Decrypt(const char *str, const char *a2)
{
    unsigned __int8 *v4; // r5
    const unsigned __int8 *v5; // r8
    size_t v6; // r0
    unsigned __int8 *v7; // r7
    size_t v8; // r6
    int v9; // r0
    int v11; // [sp+Ch] [bp-1Ch] BYREF

    if ( !str )
        return 0;
    v4 = 0;
    if ( (strlen(str) & 1) == 0 )
    {
        if ( a2 )
        {
            v5 = (const unsigned __int8 *)HexToByte(str);
            v6 = strlen(str);
            v7 = (unsigned __int8 *)malloc((v6 >> 1) + 1);
            v4 = 0;
            v11 = 0;
            v8 = strlen(str);
            v9 = strlen(a2);
            if ( RC4(v5, v8 >> 1, (const unsigned __int8 *)a2, v9, v7, &v11) )
            {
                v7[v11] = 0;
                v4 = v7;
            }
        }
    }
    return v4;
}


int main(){
    char* input_str = "636D55B2AA8609CB";
    char key[12] = {0x05,0x08,0x41,0x08,0x06,0x03,0x01,0x4e,0x61,0x44,0x80,0x0};
    char* ret = Decrypt(input_str, key);
    printf("ret = %s",ret);


    return 0;
}