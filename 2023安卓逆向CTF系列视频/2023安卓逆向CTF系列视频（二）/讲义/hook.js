function hook(){
    // 1. 拿到基址
    var base = Module.findBaseAddress("libnative-lib.so")
    console.log("base = ",base);

    var check = base.add(0x7FC).add(0x0);
    Interceptor.attach(check,{
        onEnter:function(args){
            var input_str = args[2]
            var input_str_c = Java.vm.getEnv().getStringUtfChars(input_str)
            // console.log("called enter check input_str_c = ",hexdump(input_str_c))
        },
        onLeave:function(retval){
            // console.log("called leave check retval = "+retval)
        }
    })

    var sub_B90 = base.add(0xB90).add(0x0)
    Interceptor.attach(sub_B90,{
        onEnter:function(args){
            this.arg0 = args[0]
            this.arg1 = args[1]
            this.arg2 = args[2]

            console.log("called enter sub_B90 this.arg0 = "+hexdump(this.arg0)+"\nthis.arg1="+this.arg1+"\nthis.arg2"+hexdump(this.arg2))
        },
        onLeave:function(retval){
            console.log("called leave sub_B90 retval = "+retval)
            console.log("called leave sub_B90 this.arg0 = "+hexdump(this.arg0)+"\nthis.arg1="+this.arg1+"\nthis.arg2"+hexdump(this.arg2))
        }
    })

    var sub_D90 = base.add(0xD90).add(0x0)
    Interceptor.attach(sub_D90,{
        onEnter:function(args){
            this.arg0 = args[0]
            this.arg1 = args[1]

            console.log("called enter sub_D90 this.arg0 = "+hexdump(this.arg0)+"\nthis.arg1="+this.arg1)
        },
        onLeave:function(retval){
            // console.log("called leave sub_D90 this.arg0 = "+hexdump(this.arg0)+"\nthis.arg1="+this.arg1)
            console.log("called leave sub_D90 retval = "+(retval).readCString())
        }
    })

    var inline_B34 = base.add(0xB34).add(0x0)
    Interceptor.attach(inline_B34,{
        onEnter:function(args){
            // console.log("called enter inline_B34  = " + JSON.stringify(this.context))
            console.log("called enter inline_B34  = " +hexdump(this.context.x0))
            console.log("called enter inline_B34  = " +hexdump(this.context.x9))
        },
        onLeave:function(retval){
            // console.log("called leave inline_B34 this.arg0 = "+hexdump(this.arg0)+"\nthis.arg1="+this.arg1)
            // console.log("called leave sub_D90 retval = "+(retval).readCString())
        }
    })

    


}

setImmediate(hook);

// frida -UF -l hook.js -o out.log
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx