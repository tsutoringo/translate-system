# translate-system
translate-system is like to minecraft's translate system

Usage:
```JavaScript


start = async () => {
    var translateSystem = require('translate-system');
    var t = new translateSystem('./languages/');
    await t.init()
    console.log(t.trans('message.Error',"English")) //=> hoge
    console.log(t.trans('message.Error',"Japan")) //=> ほげ＾～
}
start()
```
languagesファイルに追加することができます