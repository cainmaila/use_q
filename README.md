# Q 实现Promise – Callbacks之外的另一种选择

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

### 參考文

[Github](https://github.com/kriskowal/q)

[Q API](https://github.com/kriskowal/q/wiki/API-Reference)

[
在Node.js 中用 Q 实现Promise – Callbacks之外的另一种选择](http://www.ituring.com.cn/article/54547)

[How to actually use Q promise in node.js?](http://stackoverflow.com/questions/22678613/how-to-actually-use-q-promise-in-node-js)
