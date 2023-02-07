
var myins = null;
Java.perform(function(){
    // 1. 查找实例然后去调用
    Java.choose("net.bluelotus.tomorrow.easyandroid.MainActivity",{
        onMatch:function(ins){
            // result = ins.check(i,99)
            myins = ins;
        },
        onComplete:function(){
            // console.log("search onComplete")
        }
    })
})

function mychec(i){
    var result = null;
    console.log(typeof i)
    i = parseInt(i)
    result = myins.chec(i,99)
    console.log("called in frida_rpc_new.js result = "+result)
    return result.toString()
}

rpc.exports = {
    chec:mychec
};
