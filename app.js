"use strict";

var Q = require('q');
var fs = require('fs');

// function async() {
//     return Q.delay(1000)
// }
var async = Q.delay(1000);
// async()
async.then(console.log('async called back'));
// .then(function() {
//     console.log('async called back');
// });

function fs_readFile(file, encoding) {
    var deferred = Q.defer(); //defer自己定義一個promise
    fs.readFile(file, encoding, function(err, data) {
        if (err) deferred.reject(err) // rejects 返回一個錯誤值
        else deferred.resolve(data) // fulfills the promise with `data` as the value
    })
    return deferred.promise // the promise is returned
}
fs_readFile('myfile.txt').then(console.log, console.error);
fs_readFile('package.json').then(console.log, console.error);

var readFile = Q.nfbind(fs.readFile);
readFile("packagexx.json", "utf-8").done(function (text) {
    console.log("nfbind : ",text);
});

// var q1 = Q.nfbind(fs.readFile);
// var q1_promise = q1('package.json');
// q1_promise.then(console.log, console.error);
