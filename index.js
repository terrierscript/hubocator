var path = require("path");
var util = require("util");
var scriptDir = path.dirname(module.filename);
var coffeePath = path.join(scriptDir,"node_modules/coffee-script/bin/coffee");
var hubotPath =  path.join(scriptDir,"node_modules/hubot/bin/hubot");

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
