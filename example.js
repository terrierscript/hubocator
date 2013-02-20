var hubocator = require("./"); // require("hubocator")
var env = {
  "HUBOT_ENVIRONMENT" : "FOO"
}
var args = {
  "--name" : "hubocator_hubot",
  "--alias" : "hubot"
}
hubocator(env,args);
