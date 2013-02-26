# Description
#   Restart hubot that started by hubocator
#
# Commands:
#   hubot restart - restart hubot (use hubocator)
#   hubot show hubocator - show hubocator info
# Dependencies:
#   "hubocator": "~0.0.3"
#
# Author:
#   suisho
Util = require "util"
Hubot = require "hubot"
User = Hubot.User
hubocatorInfoHook = (callback) ->
  process.once "message", (msg) ->
    if msg.HUBOCATOR_CMD != "info"
      return
    info = msg.HUBOCATOR_INFO
    callback(info)
  process.send {HUBOCATOR_CMD : "show_info"}
  
module.exports = (robot) ->
  self = this;
  @restartUser;
  # echo when restart
  hubocatorInfoHook (info) =>
    if info.restarted
      try
        # TODO: cannot replay for some adapters (example: irc)
        # listen dapter connect and get user
        robot.send null,"Restart Done on " + info.startTime
      catch e
        console.log "[Error] Error: " + e.message
      
  # return pong when hubot is restarted
  process.send {HUBOCATOR_CMD : "show_info"}

  # restarting
  robot.respond /restart/i, (msg) =>
    @restartUser = msg.envelope
    msg.send "Restart..."
    process.send {HUBOCATOR_CMD : "restart"}

  # show hubocator info
  robot.respond /show hubocator/i,(msg) ->
    hubocatorInfoHook (info) ->
      if info
        for key, value of info
          msg.send "HUBOCATOR:" +  key + " => " + Util.inspect(value)
