

function hook(){
    // 1. 拿到目标so的基址
    // https://frida.re/docs/javascript-api/
    var base = Module.findBaseAddress("libwolf.so")
    console.log("base = ",base);
    // 由于该so是arm架构，所以偏移要加1
    var bc = base.add(0x14074).add(0x1)
    Interceptor.attach(bc,{
        onEnter:function(args){
            var arg3 = args[3] // jstring
            // https://github.com/frida/frida-java-bridge
            var arg3_c = Java.vm.getEnv().getStringUtfChars(arg3)
            // console.log("arg3="+hexdump(arg3_c))
            console.log("enter bc arg3="+arg3_c.readCString())
        },
        onLeave:function(retval){

        }
    })

    var dc = base.add(0x14508).add(0x1)
    Interceptor.attach(dc,{
        onEnter:function(args){
            var arg2 = args[2] // 
            console.log("enter dc arg2="+arg2.readCString());
        },
        onLeave:function(retval){
            console.log("leave dc retval = "+retval);
            // retval.replace(0x1)
        }
    })

    var Decrypt = base.add(0x13F34).add(0x1)
    Interceptor.attach(Decrypt,{
        onEnter:function(args){
            var arg0 = args[0] // 
            var arg1 = args[1]
            console.log("enter Decrypt arg0="+arg0.readCString()+"---arg1="+hexdump(arg1));
        },
        onLeave:function(retval){
            console.log("leave Decrypt retval = "+hexdump(retval));
            // retval.replace(0x1)
        }
    })
}

setImmediate(hook)
// frida -UF -l hook.js -o out2.log