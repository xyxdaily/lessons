function readStdString(str) {
    const isTiny = (str.readU8() & 1) == 0;
    if (isTiny) {
        return str.add(1).readUtf8String();
    }
    return str.add(2 * Process.pointerSize).readPointer().readUtf8String();
}

function callPrettyMethod(ArtMethodptr) {
    // _ZN3art9ArtMethod12PrettyMethodEPS0_b
    var PrettyMethod_addr =  Module.findExportByName("libart.so", "_ZN3art9ArtMethod12PrettyMethodEPS0_b");
    var PrettyMethodfunc = new NativeFunction(PrettyMethod_addr, ["pointer", "pointer", "pointer"], ["pointer", "int"]);
    var result = PrettyMethodfunc(ArtMethodptr, 1);
    var stdstring = Memory.alloc(3 * Process.pointerSize);
    ptr(stdstring).writePointer(result[0]);
    ptr(stdstring).add(1 * Process.pointerSize).writePointer(result[1]);
    ptr(stdstring).add(2 * Process.pointerSize).writePointer(result[2]);
    var result = readStdString(stdstring)
    return result
}

function hook_RegisterNativeMethod() {
    var RegisterNativeMethod_addr = Module.findExportByName("libart.so", "_ZN3art16RuntimeCallbacks20RegisterNativeMethodEPNS_9ArtMethodEPKvPPv");
    console.log("RegisterNativeMethod_addr=",RegisterNativeMethod_addr)
    // art::RuntimeCallbacks::RegisterNativeMethod(art::ArtMethod*, void const*, void**)
    Interceptor.attach(RegisterNativeMethod_addr, {
        onEnter: function (args) {
            this.artmethod = args[1];
            var methodname = callPrettyMethod(ptr(this.artmethod));
            var address = args[2];
            this.dex_method_index_ = ptr(this.artmethod).add(12).readU32();
            var current_module = Process.getModuleByAddress(address)
            var modulename = current_module.name
            var base = current_module.base
            var offset = address.sub(base)
            console.log("go into RegisterNativeMethod ---" + "artmethodptr:" + ptr(this.artmethod) + "---methodidx:" + this.dex_method_index_ + "--addr:" + address + "----name:" + methodname + "---modulename:" + modulename + "---offset:" + offset);
            return;
        }, onLeave: function (retval) {
        }
    })
}
setImmediate(hook_RegisterNativeMethod)
// frida -U -f com.lingzhiyi.testgo -l hook_RegisterNativeMethod.js --no-pause -o out.log