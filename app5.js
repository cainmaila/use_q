"use strict";
var Q = require('q');
//Promise-for-Function Methods

//promise.fapply(args)
Q(getAnFunction) //回傳一個函數
    .fapply(["my_message!!"]) //執行並傳入參數，跟apply用法一樣
    // .fcall("my_message!!") //執行並傳入參數，跟call用法一樣
    .then(console.log); //印出

//取回字串
function getAnFunction(my_message) {
    console.log("getAnFunction run!! "+my_message);
    return my_message;
}
