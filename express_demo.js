var express = require('express');
var q = require('q');
var app = express();
app.get('/', function (req, res) {
    console.log(req);
  res.send('Hello World!');
});
app.listen(100,function (err) {
    console.error(err);
});
