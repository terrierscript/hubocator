# Description
#   Restart hubot that started by hubocator
#
# Dependencies:
#   "hubocator": "~0.0.3"
#
# Author:
#   suisho
Util = require "util"


module.exports = (robot) ->
  # echo when restart
  process.on "message", (msg) ->
    if msg.HUBOCATOR_CMD != "info"
      return
    info = msg.HUBOCATOR_INFO
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
    process.once "message", (_msg) ->
      info = _msg.HUBOCATOR_INFO
      if info
        msg.send Util.inspect info
    
    process.send {HUBOCATOR_CMD : "show_info"}
