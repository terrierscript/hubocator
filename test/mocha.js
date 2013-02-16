var rewire = require("rewire")

var assert = require("assert");
describe('ParseArgs', function () {
  var hubocator = rewire("../index");
  var parseArgs = hubocator.__get__("parseArgs");
  it('env', function () {
    var result = parseArgs({
      "HUBOT_IRC_NICK" : "huubot",
      "HUBOT_IRC_SERVER" : "foo.irc.com"
    });
    assert.deepEqual(result,{
      env : {
        "HUBOT_IRC_NICK" : "huubot",
        "HUBOT_IRC_SERVER" : "foo.irc.com"
      },
      args : [],
      options : {}
    })
  });
  it('env arg', function () {
    var result = parseArgs({
      "HUBOT_IRC_NICK" : "huubot",
      "HUBOT_IRC_SERVER" : "foo.irc.com"
    },["-a","irc"]);
    assert.deepEqual(result,{
      env : {
        "HUBOT_IRC_NICK" : "huubot",
        "HUBOT_IRC_SERVER" : "foo.irc.com"
      },
      args : ["-a","irc"],
      options : {}
    })
  });
  it('only arg', function () {
    var result = parseArgs(["-a","irc"]);
    assert.deepEqual(result,{
      env : {},
      args : ["-a","irc"],
      options : {}
    })
  });
  
  it('arg as string', function () {
    var result = parseArgs({},"-a irc");
    assert.deepEqual(result,{
      env : {},
      args : ["-a","irc"],
      options : {}
    });
  });
  it('arg as string(first args)', function () {
    var result = parseArgs("-a irc");
    //console.log(result);
    assert.deepEqual(result,{
      env : {},
      args : ["-a","irc"],
      options : {}
    });
  });
  it('args as object', function () {
    var result = parseArgs({},{"-a":"irc"});
    assert.deepEqual(result,{
      env : {},
      args : ["-a","irc"],
      options : {}
    })
  });
  it("options" , function () {
    
    var result = parseArgs({
      "HUBOT_IRC_NICK" : "huubot",
      "HUBOT_IRC_SERVER" : "foo.irc.com"
    }, "-a irc", {
      coffeePath : "coffee_path",
      hubotPath : "hubot_path"
    });
    assert.deepEqual(result, {
      env : {
        "HUBOT_IRC_NICK" : "huubot",
        "HUBOT_IRC_SERVER" : "foo.irc.com"
      },
      args : ["-a","irc"],
      options : {
        coffeePath : "coffee_path",
        hubotPath : "hubot_path"
      }
    })
  })
  it("options" , function () {
    var result = parseArgs("-a irc", {
      coffeePath : "coffee_path",
      hubotPath : "hubot_path"
    })
    assert.deepEqual(result, {
      env : {},
      args : ["-a","irc"],
      options : {
        coffeePath : "coffee_path",
        hubotPath : "hubot_path"
      }
    })
  })
})
