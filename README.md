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

### scripts
Copy `scripts/hubocator_reset.coffee` to your hubot scripts directory
This script add function restart hubot through hubocator

## usage
```javascript
var hubocator = require("hubocator");
hubocator(); // called hubot
```

#### environment
This value set on process.env
```javascript
var hubocator = require("hubocator");
var env = {
  "HUBOT_ENVIRONMENT" : "FOO"
}
hubocator(env);
```

#### args
This value is hubot arguments.
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

## Demo
You can try on example.js. 
```sh
$ node example.js
```

- Restarting example
```sh
hubocator_hubot> hubot restart
```

- Confirm example
```sh
hubocator_hubot> hubot show hubocator
```
