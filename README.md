# Q 實現Promise – 脫離Callbacks地獄

### 用法

就是把callbacks封裝起來，看起來乾淨，連續型callbacks很適合用

簡單來說就是把你return的值，丟到下一個then裡的function去跑
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

```
也可以看app3.js
### 使用Node的預設promise
不用自己定義promise，會幫你定義好(例如使用fs)
```javascript
var readFile = Q.nfbind(fs.readFile); //有針對node的取得promise，後可接要帶入的參數
readFile("package.json", "utf-8").done(function (text) {
    console.log(text);
});
//down與then的詫異在於
//down 如果沒有定義錯誤的回應含式會跳錯誤，但是then會忽略不跳
```
你可以參考app.js

### Promise的物件方法
* **Promise.get ( key )** 取出key中的值
```javascript
var readFile = Q.nfbind(fs.readFile);
readFile("package.json", "utf-8")
    .then(function(text) {
        return JSON.parse(text); //返回物件
    })
    .get("version") //取出version的值
    .then(console.log); //印出
    //請見app4.js
```
* **Promise.post ( callFun, [key..] )** 取出function再繼續run
```javascript
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
.then(console.log); //印出
```
* **Promise.invoke ( callFun, age.. )** invoke 類似call呼叫所以參數不用陣列
* **Promise.keys ()** 取出物件中的全部key name，不用參數

### Promise的Function方法

* **promise.fapply ( args )** 返回Function並執行，參數方法跟apply一樣

```javascript
Q(getAnFunction) //回傳一個函數
    .fapply(["my_message!!"]) //執行並傳入參數，跟apply用法一樣
    // .fcall("my_message!!") //執行並傳入參數，跟call用法一樣
    .then(console.log); //印出

//取回字串
function getAnFunction(my_message) {
    console.log("getAnFunction run!! "+my_message);
    return my_message;
}
```
* **promise.fcall ( args.. )** 返回Function並執行，參數方法跟call一樣

### Promise的陣列方法

* **promise.all()** 陣列中各Promise執行回覆後，才會繼續後面的done，回傳的是陣列，要注意的是其中有error整個就算錯誤
```javascript
var readFile = Q.nfbind(fs.readFile);
Q.all([readFile('package.json'), Q.delay(2000)]).done(console.log);
```

* **promise.spread ( onFulfilled, onRejected )** 會把all的回傳的陣列拆成參數，要注意的是有其中有error整個就算錯誤
```javascript
var readFile = Q.nfbind(fs.readFile);
Q.all([readFile('package.json'), Q.delay(2000)]).spread(function (diskVal, cloudVal) {
        assert(diskVal === cloudVal);
},console.error).done();
```

* **promise.allSettled ( )** 不管是否有錯誤，都會進下一串
```javascript
var readFile = Q.nfbind(fs.readFile);
readFile('packageX.json')]).spread(function (disk, cloud) {
    console.log("saved to disk:", disk.state === "fulfilled");
    console.log("saved to cloud:", cloud.state === "fulfilled");
}).done();
```
以上可以參考 app6.js

### 其他工具方法

* **promise.thenResolve( value )** 語法糖，類似以下作用
```javascript
promise.then(function () { return value; });
```
* **promise.thenReject(reason)** 語法糖，類似以下作用
```javascript
promise.then(function () { throw reason; })
```
* **promise.tap(onFulfilled)** 類似 middleware 概念，處理完後會把上一個 return 繼續傳下去
```javascript
Q("Hello, World!")
.delay(1000)
.tap(console.log) //這裡不須 return
.then(function (message) {
    expect(message).toBe("Hello, World!");
})
```
* **promise.timeout ( ms, message )** 逾時處理，message會是超過時錯誤訊息，沒有定義會有預設值"Timed out after " + ms + " ms"
```javascript
promise.timeout(10000).then(
  function (result) {
    // 回傳完成執行
    console.log(result);
  },
  function (err) {
    // 失敗或逾時實行
    console.log(err);
  }
);
```
* **promise.delay(ms)** 就 delay 沒什麼好說的XD
```javascript
Q.delay(150).then(doSomething);
```

### 狀態檢測方法

* **promise.isFulfilled ( )** 檢查是否有成功狀態

```javascript
//promise.isFulfilled() 檢查是否有成功狀態
var readFile = Q.nfbind(fs.readFile);
var readFile_load = readFile('package.json');
console.log("讀取狀態:"+readFile_load.isFulfilled()); //看一下是否有成功狀態
readFile_load.then(function (txt) {
    console.log(txt.toString());
    console.log("讀取狀態:"+readFile_load.isFulfilled()); //讀取後看一下是否有成功狀態
});
```

* **promise.isRejected ( )** 檢查是否有錯誤狀態

```javascript
var readFile2 = Q.nfbind(fs.readFile);
var readFile2_load = readFile2('package_x.json'); //給一個 錯誤的路徑
console.log("讀取錯誤:"+readFile2_load.isRejected()); //看一下是否有錯誤狀態
readFile2_load.then(function (txt) {
    console.log(txt.toString());
},console.error); //輸出錯訊息
Q.delay(1000).done(function () { //一段時間後看看readFile3_load是否有錯誤狀態
    console.log("讀取錯誤:"+readFile2_load.isRejected()); //true
})
```

* **promise.inspect ( )** 狀態輸出

```javascript
var readFile3 = Q.nfbind(fs.readFile);
var readFile3_load = readFile3('package.json'); //讀 取
// var readFile_load = readFile('package_x.json'); //嘗試錯誤的路徑
Q.delay(1000).done(function () { //一段時間後看看readFile3_load的狀態
    console.log(readFile3_load.inspect());
})
```

### 自定義 Promise
* **Q.defer()**

返回一個自己定義的Promise物件，有下列方法
```
//property
promise 

//method
resolve(value)  //回傳值  
reject(reason)    //失敗與失敗物件訊息
notify(value)    // onProgress 訊息
makeNodeResolver()
```
DEMO => app8.js
```javascript
ar Q = require('q');
var deferred = Q.defer(); //自定義
deferred.promise.then(run_end, run_error, onProgress); //設定 return
setTimeout(function() {
    deferred.notify(30); //onProgress
}, 100);
setTimeout(function() {
    deferred.notify(80); //onProgress
}, 200);
setTimeout(function() {
    deferred.notify(100); //onProgress
    // deferred.reject(new Error("error!!")); //error
    deferred.resolve("ok!"); //成功
}, 300);

function onProgress(value) {
    console.log("notify 進行中! " + value, deferred.promise);
}

function run_end(value) {
    console.log("resolve 成功! " + value, deferred.promise);
}

function run_error(error) {
    console.log("reject 錯誤! ", deferred.promise);
    console.error(error);
}
```



### 參考文

[Github](https://github.com/kriskowal/q)

[Q API](https://github.com/kriskowal/q/wiki/API-Reference)

[
在Node.js 中用 Q 实现Promise – Callbacks之外的另一种选择](http://www.ituring.com.cn/article/54547)

[How to actually use Q promise in node.js?](http://stackoverflow.com/questions/22678613/how-to-actually-use-q-promise-in-node-js)
