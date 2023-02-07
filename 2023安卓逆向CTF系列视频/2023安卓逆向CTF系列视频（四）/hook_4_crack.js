// 

function hook(){
    Java.perform(function(){
        // 1. 查找实例然后去调用
        // Java.choose("net.bluelotus.tomorrow.easyandroid.MainActivity",{
        //     onMatch:function(ins){
        //         console.log(ins)
        //         for(var i = 236491408;i<236493408;i++){
        //             var result = ins.check(i,99)
        //             // 0 1599503850 
        //             // 1 1599503851
        //             // 100 1599503950
        //             // ? 1835996258   => 236492408
        //             if(result==1835996258){
        //                 console.log("result = ",result," i=",i)
        //                 break;
        //             }
        //             // else{
        //             //     console.log("i = ",i)
        //             // }
                    
        //         }
                
        //     },
        //     onComplete:function(){
        //         // console.log("search onComplete")
        //     }
        // })

        // 2. 创建一个实例 然后去调用
        // var MainActivity = Java.use("net.bluelotus.tomorrow.easyandroid.MainActivity");
        // var ins = MainActivity.$new()
        // MainActivity.check() // 如果是静态方法，直接掉
        console.log(Java.use("android.util.Base64").encodeToString(Java.use("java.lang.String").$new("hello").getBytes(),0))
        // console.log(ins.check(1,99))
    })
}

setImmediate(hook)

// frida -UF -l hook_4_crack.js -o out.log