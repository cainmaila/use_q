"use strict";
//State Inspection Methods
var Q = require('q');
var fs = require('fs');

//promise.isFulfilled() 檢查是否有成功狀態
var readFile = Q.nfbind(fs.readFile);
var readFile_load = readFile('package.json');
console.log("讀取狀態:"+readFile_load.isFulfilled()); //看一下是否有成功狀態
readFile_load.then(function (txt) {
    console.log(txt.toString());
    console.log("讀取狀態:"+readFile_load.isFulfilled()); //讀取後看一下是否有成功狀態
});

//promise.isRejected() 檢查是否有錯誤狀態
var readFile2 = Q.nfbind(fs.readFile);
var readFile2_load = readFile2('package_x.json'); //給一個錯誤的路徑
console.log("讀取錯誤:"+readFile2_load.isRejected()); //看一下是否有錯誤狀態
readFile2_load.then(function (txt) {
    console.log(txt.toString());
},console.error); //輸出錯訊息
Q.delay(1000).done(function () { //一段時間後看看readFile3_load是否有錯誤狀態
    console.log("讀取錯誤:"+readFile2_load.isRejected()); //true
})

//promise.inspect() 狀態輸出
var readFile3 = Q.nfbind(fs.readFile);
var readFile3_load = readFile3('package.json'); //讀取
// var readFile_load = readFile('package_x.json'); //嘗試錯誤的路徑
Q.delay(1000).done(function () { //一段時間後看看readFile3_load的狀態
    console.log(readFile3_load.inspect());
})
