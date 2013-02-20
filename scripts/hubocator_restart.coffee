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

hubocatorInfoHook = (hook) ->
  process.once "message", (msg) ->
    if msg.HUBOCATOR_CMD != "info"
      return
    info = msg.HUBOCATOR_INFO
    hook(info)
  process.send {HUBOCATOR_CMD : "show_info"}
  
module.exports = (robot) ->
  # echo when restart
  hubocatorInfoHook (info) ->
    if info.restarted
      robot.send null,"Restart Done on " + info.startTime
      
  # return pong when hubot is restarted
  process.send {HUBOCATOR_CMD : "show_info"}

  # restarting
  robot.respond /restart/i, (msg) ->
    msg.send "Restart..."
    process.send {HUBOCATOR_CMD : "restart"}

  # show hubocator info
  robot.respond /show hubocator/i,(msg) ->
    hubocatorInfoHook (info) ->
      if info
        for key, value of info
          
          msg.send "HUBOCATOR:" +  key + " => " + Util.inspect(value)
