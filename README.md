# Q 实现Promise – Callbacks之外的另一种选择

### 用法

就是把callbacks封裝起來，看起來乾淨
```javascript
var Q = require('q');

var async = Q.delay(1000);
//Q提共了很多方法回傳各種服務，比方 delay 就是等待時間後 callbacks

async.then(console.log('async called back'));
//一秒輸出 async called back
```

### 自己定義一個promise
```javascript
var deferred = Q.defer() //defer自己定義一個promise
deferred.resolve(value); //返回值
deferred.reject(reason); //返回錯誤
deferred.notify(value); //一個進程例如onProgress
var promise = deferred.promise; //返回promise
promise(resolve, reject, notify); //依序傳入

var readFile = Q.nfbind(fs.readFile); //有針對node的取得promise，後可接要帶入的參數
```
也可以看app3.js

### 參考文

[Github](https://github.com/kriskowal/q)

[
在Node.js 中用 Q 实现Promise – Callbacks之外的另一种选择](http://www.ituring.com.cn/article/54547)

[How to actually use Q promise in node.js?](http://stackoverflow.com/questions/22678613/how-to-actually-use-q-promise-in-node-js)
