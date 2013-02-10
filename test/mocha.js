var hubocator = require("../index");
var assert = require("assert");
describe('index.js', function () {
  it('env', function (done) {
    hubocator.evocation = function(env, args, coffeePath, hubotPath){
      assert.deepEqual(env, {
        "HUBOT_IRC_NICK" : "huubot",
        "HUBOT_IRC_SERVER" : "foo.irc.com"
      })
      done();
    }
    hubocator( {
      "HUBOT_IRC_NICK" : "huubot",
      "HUBOT_IRC_SERVER" : "foo.irc.com"
    });
  });
  it('env arg', function (done) {
    hubocator.evocation = function(env, args, coffeePath, hubotPath){
      assert.deepEqual(env, {
        "HUBOT_IRC_NICK" : "huubot",
        "HUBOT_IRC_SERVER" : "foo.irc.com"
      })
      assert.deepEqual(args, ["-a","irc"])
      done();
    }
    hubocator({
      "HUBOT_IRC_NICK" : "huubot",
      "HUBOT_IRC_SERVER" : "foo.irc.com"
    },["-a","irc"]);
  });
  it('only arg', function (done) {
    hubocator.evocation = function(env, args, coffeePath, hubotPath){
      assert.deepEqual(env, {})
      assert.deepEqual(args, ["-a","irc"])
      done();
    }
    hubocator(["-a","irc"]);
  });
  it('arg as string', function (done) {
    hubocator.evocation = function(env, args, coffeePath, hubotPath){
      assert.deepEqual(env, {})
      assert.deepEqual(args, ["-a","irc"])
      done();
    }
    hubocator({},"-a irc");
  });
  it('arg as string(first args)', function (done) {
    hubocator.evocation = function(env, args, coffeePath, hubotPath){
      assert.deepEqual(env, {})
      assert.deepEqual(args, ["-a","irc"])
      done();
    }
    hubocator("-a irc");
  });
  it("options" , function (done) {
    hubocator.evocation = function(env, args, coffeePath, hubotPath){
      assert.deepEqual(env, {
        "HUBOT_IRC_NICK" : "huubot",
        "HUBOT_IRC_SERVER" : "foo.irc.com"
      })
      assert.deepEqual(args, ["-a","irc"])
      assert.equal(coffeePath, "coffee_path")
      assert.equal(hubotPath, "hubot_path")
      done();
    }
    hubocator({
      "HUBOT_IRC_NICK" : "huubot",
      "HUBOT_IRC_SERVER" : "foo.irc.com"
    },"-a irc", {
      coffeePath : "coffee_path",
      hubotPath : "hubot_path"
    });
  })
  it("options" , function (done) {
    hubocator.evocation = function(env, args, coffeePath, hubotPath){
      assert.deepEqual(env, {})
      assert.deepEqual(args, ["-a","irc"])
      assert.equal(coffeePath, "coffee_path")
      assert.equal(hubotPath, "hubot_path")
      done();
    }
    hubocator("-a irc", {
      coffeePath : "coffee_path",
      hubotPath : "hubot_path"
    });
  })
});
