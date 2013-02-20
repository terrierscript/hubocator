var path = require("path");
var util = require("util");
var clone = require("clone")
var fs = require("fs");
var colors = require('colors');
colors.setTheme({
  cmd: 'green',
  error: 'red'
});

var scriptDirs = module.paths.concat();
var current = scriptDirs.shift();
scriptDirs.push(current);

var coffeePath;
var hubotPath;
scriptDirs.forEach(function(scriptDir){
  var coffee = path.join(scriptDir,"coffee-script/bin/coffee");
  var hubot  = path.join(scriptDir,"hubot/bin/hubot");
  if(!coffeePath && fs.existsSync(coffee)){
    coffeePath = coffee;
  }
  if(!hubotPath && fs.existsSync(hubot)){
    hubotPath = hubot;
  }
})

module.exports = function(env, args, options){
  var parsed =  parseArgs(env, args, options)
  env = parsed.env;
  args = parsed.args;
  options = parsed.options;
  
  var scriptDir = path.dirname(module.filename);
  var coffeePath = path.join(scriptDir,"node_modules/coffee-script/bin/coffee");
  var hubotPath =  path.join(scriptDir,"node_modules/hubot/bin/hubot");
  
  if(options.coffeePath){
    coffeePath = options.coffeePath
  }
  if(options.hubotPath){
    hubotPath = options.hubotPath
  }
  var err = []
  if(!coffeePath){
    err.push("[Error]".error+" Coffee script is not installed.")
    err.push("[Error]".error+" Please try "+" $npm install coffee-script".cmd)
  }
  if(!hubotPath){
    err.push("[Error]".error+" Hubot is not installed.")
    err.push("[Error]".error+" Please try "+" $npm install hubot".cmd)
  }
  if(err){
    err.forEach(function(_err){
      console.error(_err);
    })
  }
  var hubocator = new Hubocator({
     env : env,
     args : args,
     coffeePath : coffeePath,
     hubotPath : hubotPath
  });
  hubocator.evocation()
}

var addEvent = function(process, cmd, eventFunc){
  process.on("message", function(msg){
    if(msg.HUBOCATOR_CMD === cmd){
      eventFunc()
    }
  })
}

var Hubocator =  function(opts){
  this.opts = clone(opts);
  this.env = opts.env;
  this.args = opts.args;
  this.coffeePath = opts.coffeePath;
  this.hubotPath = opts.hubotPath;
  this.restarted = opts.restarted
}
Hubocator.prototype.evocation = function(){
  this.bot = this.fork();
  this.hookEvents()
  return this.bot
}

Hubocator.prototype.hookEvents = function(){
  var self = this;
  var bot = this.bot
  addEvent(bot, "restart", function(){
    bot.on("exit", function(){
      var opts = clone(self.opts);
      opts.restarted = true;
      var restartBot = new Hubocator(opts)
      restartBot.evocation();
    });
    bot.kill()
  })
  // info event
  addEvent(bot, "show_info", function(){
    var info = clone(self.opts)
    info.restarted = self.restarted
    info.pid = process.pid
    info.startTime = self.startTime
    bot.send({
      HUBOCATOR_CMD : "info",
      HUBOCATOR_INFO : info
    })
  })
}

Hubocator.prototype.fork = function(){
  var args = this.args.concat()
  var fork = require('child_process').fork
  args.unshift(this.hubotPath);
  var hubot = fork(this.coffeePath, args, {
    env : this.env
  })
  this.startTime = new Date();
  return hubot;
}


var parseArgs = function(env, args, options){
  if(typeof env !== "object" || util.isArray(env)){
    options = args;
    args = env;
    env = undefined;
  }
  env  = env || {};
  args = args || [];
  
  options = options || {}
  // args parsing
  if(typeof args == "string"){
    args = args.split(" ");
  }
  if(typeof args == "object" && !util.isArray(args)){
    var _args = [];
    Object.keys(args).forEach(function(key){
      _args.push(key);
      _args.push(args[key]);
    });
    args = _args;
  }
  // return
  return {
    env : env,
    args : args,
    options : options
  }
}

