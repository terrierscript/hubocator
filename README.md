# Hubocator
Execute hubot only javascript (without shell export).

## install

```
npm install hubocator
```

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
