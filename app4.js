"use strict";

//Promise的物件方法
var Q = require('q');
var fs = require('fs');

//Promise.get(key) 取出key的值
var readFile = Q.nfbind(fs.readFile);
readFile("package.json", "utf-8")
    .then(function(text) {
        return JSON.parse(text); //返回物件
    })
    // .keys() //取出物件中的全部key name
    .get("version") //取出version的值
    .then(console.log); //印出


//Promise.post(callFun,[key..]) 取出function再繼續run
var delay_ob = Q.delay(500);
delay_ob.then(function () {
    return { //返回物件帶有call_me這個function的物件
        call_me:function (my_message) {
            console.log("call_me run!!");
            return my_message;
        }
    };
})
.post("call_me",["post demo!!"]) //執行call_me 再帶入參數,類似apply呼叫所以參數必須陣列
// .invoke("call_me","post demo!!") //invoke 類似call呼叫所以參數不用陣列
.then(console.log); //印出
