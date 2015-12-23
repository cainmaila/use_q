var express = require('express');
var q = require('q');
var app = express();
var q_use = q.nfbind(app.get);
app.get('/', function (req, res) {
    console.log(req);
  res.send('Hello World!');
});
// var q_app = q.nfbind(app.listen);
// q_app(8000).then(console.log("listen in 80!!"));
// app.listen(8000);

var q_app = q.defer();
q_app.resolve = console.log;
q_app.promise.then(8000,"listen in 8000!!");
