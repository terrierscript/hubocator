var path = require("path");
var util = require("util");
var fs = require("fs");

var scriptDirs = module.paths.concat();
var current = scriptDirs.shift();
scriptDirs.push(current);

// this package's node_module is last resort (only use when can't find other paths)
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
  if(typeof env !== "object" || util.isArray(env)){
    args = env;
    options = args;
    env = undefined;
  }
  env  = env || {};
  args = args || [];
  options = options || {}
  if(typeof args == "string"){
    args = args.split(" ");
  }
  if(options.coffeePath){
    coffeePath = options.coffeePath
  }
  if(options.hubotPath){
    hubotPath = options.hubotPath
  }
  return module.exports.evocation(env, args, coffeePath, hubotPath);
}


module.exports.evocation = function(env, args, coffeePath, hubotPath){
  var fork = require('child_process').fork
  args.unshift(hubotPath);
  var hubot = fork(coffeePath, args, {
    env : env
  })
  return hubot;
}
