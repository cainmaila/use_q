"use strict";
//How to use Q.defer()
var Q = require('q');
var deferred = Q.defer(); //自定義
deferred.promise.then(run_end, run_error, onProgress); //設定 return
setTimeout(function() {
    deferred.notify(30); //onProgress
}, 100);
setTimeout(function() {
    deferred.notify(80); //onProgress
}, 200);
setTimeout(function() {
    deferred.notify(100); //onProgress
    // deferred.reject(new Error("error!!")); //error
    deferred.resolve("ok!"); //成功
}, 300);

function onProgress(value) {
    console.log("notify 進行中! " + value, deferred.promise);
}

function run_end(value) {
    console.log("resolve 成功! " + value, deferred.promise);
}

function run_error(error) {
    console.log("reject 錯誤! ", deferred.promise);
    console.error(error);
}
