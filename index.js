var path = require("path");
var util = require("util");

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
  return module.exports.evocation(env, args, coffeePath, hubotPath);
  var bot = evocation(env, args, coffeePath, hubotPath);
  
  // add restart event
  bot.once("message",function(msg){
    if(msg != "hubocator_restart"){
      return
    }
    bot.once("exit",function(){
      var restartBot = evocation(evn, args, coffeePath, hubotPath);
      return restartBot
    });
    bot.kill();
  });
  return bot;
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
  return {
    env : env,
    args : args,
    options : options
  }
}

var evocation = function(env, args, coffeePath, hubotPath){
  var fork = require('child_process').fork
  args.unshift(hubotPath);
  var hubot = fork(coffeePath, args, {
    env : env
  })
  return hubot;
}
