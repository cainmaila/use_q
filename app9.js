"use strict";
//How to use Q object
var Q = require('q');
// Q ( value )
var promise_1 = Q.delay(1000).then(log_message);
Q(promise_1).then(console.log,console.error);
Q("cain").then(console.log,console.error);

//Q.reject(reason)
Q.reject(new Error("my error!")).then(console.log,console.error);

// Q.Promise ( resolver )
Q.Promise(function () {
    console.log("run init!!");
    // throw new Error("my error!");
    return "ok!";
}).then(console.log,console.error);

function log_message(value) {
    if (!value) {
        value = "no return";
    }
    console.log(value);
}
