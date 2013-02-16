# Hubocator
Execute hubot only javascript (without shell export).

## install

```
npm install coffee-script
npm install hubot
npm install hubocator
```
This module process executing wrapper and haven't hubot and coffee-script.
Please install these module.

## usage

 ```javascript
var hubocator = require("hubocator");
hubocator(); // called hubot
```

#### environment
```javascript
var hubocator = require("hubocator");
var env = {
  "HUBOT_ENVIRONMENT" : "FOO"
}
hubocator(env);
```

#### args
```javascript
var hubocator = require("hubocator");
var env = {
  "HUBOT_ENVIRONMENT" : "FOO"
}
var args = [
  "-a", "irc"
]
hubocator(env,args);
//or
hubocator(args);
```

`args` can as object if you need
```javascript
var hubocator = require("hubocator");
var env = {
  "HUBOT_ENVIRONMENT" : "FOO"
}
var args = {
  "-a": "irc"
}
hubocator(env,args);

```

#### options
- coffeePath
  - coffee script execute path
- hubotPath
  - hubot execute path
