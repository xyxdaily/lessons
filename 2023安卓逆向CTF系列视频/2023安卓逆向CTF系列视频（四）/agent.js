function myadd2(a,b){
    return a+b
}





function mychec(a,b){
    var result = a+b+1;
    send("called in mychec")
    // return 
    // Java.choose("net.bluelotus.tomorrow.easyandroid.MainActivity",{
    //     onMatch:function(ins){
    //         result = ins.check(i,99)
    //     },
    //     onComplete:function(){
    //         // console.log("search onComplete")
    //     }
    // })
    return result;
}

rpc.exports = {
    add(a, b) {
      return a + b;
    },
    add2:myadd2,
    chec:mychec
};

