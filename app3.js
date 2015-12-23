"use strict";

var Q = require('q');
var cain = Q.defer() //defer自己定義一個promise
console.log(cain.promise);
setTimeout(function () {
    cain.notify(1); //一個進程例如onProgress
    cain.resolve(2); //返回值
    cain.reject(3); //返回錯誤 有resolve不會跑reject
},1000);
cain.promise.then(console.log, console.log,  console.log);
//依序傳入
console.log(cain.promise);
