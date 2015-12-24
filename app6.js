"use strict";
//Promise-for-Array Methods
var Q = require('q');
var fs = require('fs');

var readFile = Q.nfbind(fs.readFile);
//Q.all 超酷同步聯集，陣列中的Promise執行回覆後，才會繼續後面的done，回傳的是陣列，要注意的是有error整個就算錯誤
Q.all([readFile('package.json'), Q.delay(2000)]).done(console.log);

//Q.spread 會把all的陣列拆成參數，要注意的是有其中有error整個就算錯誤
Q.all([readFile('package.json'), Q.delay(2000)]).spread(function (diskVal, cloudVal) {
        assert(diskVal === cloudVal);
},console.error).done();

//Q.allSettled 不管是否有錯誤，都會進
Q.allSettled([readFile('package.json'), readFile('packageX.json')]).spread(function (disk, cloud) {
    console.log("saved to disk:", disk.state === "fulfilled");
    console.log("saved to cloud:", cloud.state === "fulfilled");
}).done();
