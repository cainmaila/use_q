var Q = require('q');
var fs = require('fs');
var aa = Q.nfbind(fs.mkdir).makeNodeResolver();
console.log(aa);
