function hook(){
    Java.perform(function(){
        // Java.use("java.lang.String").equals.implementation = function(str){
        //     var result = this.equals(str)
        //     console.log("str = "+str);
        //     return result
        // }
        // Java.use("cn.chaitin.geektan.crackme.MainActivityPatch").Joseph.implementation = function(i,i2){
        //     var result = this.Joseph(i,i2);
        //     console.log("i = "+i+"---i2="+i2+"---result = "+result)
        //     return result;
        // }

        // console.log(Java.enumerateClassLoadersSync())
        Java.enumerateClassLoadersSync().forEach(function(loader){
            // console.log(loader)
            try{
                if(loader.loadClass("cn.chaitin.geektan.crackme.MainActivityPatch")){
                    console.log("find class " ,loader)
                    Java.classFactory.loader = loader
                            Java.use("cn.chaitin.geektan.crackme.MainActivityPatch").Joseph.implementation = function(i,i2){
                                var result = this.Joseph(i,i2);
                                console.log("i = "+i+"---i2="+i2+"---result = "+result)
                                return result;
                            }
                }
            }catch{

            }
        })
    })
}

setImmediate(hook)

// frida -UF -l hook.js -o out.log
// frida -U -f cn.chaitin.geektan.crackme -l hook.js -o out.log