# Hubocator
Execute hubot wrapper. 
Only javascript (without shell export) and support restarting hubot.

## Installation

```
npm install coffee-script
npm install hubot
npm install hubocator
```
This module process executing wrapper and haven't hubot and coffee-script.
Please install these module.

### scripts
Copy [scripts/hubocator_reset.coffee](https://github.com/suisho/hubocator/blob/master/scripts/hubocator_restart.coffee) to your hubot scripts directory
This script add function restart hubot through hubocator

## Demo
Demo is [here](https://github.com/suisho/hubocator-demo)
```sh
git clone git://github.com/suisho/hubocator-demo.git
cd hubocator-demo
npm install
node example.js
```

- Restarting example
```sh
hubocator_hubot> hubot restart
```

- Confirm example
```sh
hubocator_hubot> hubot show hubocator
```

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
