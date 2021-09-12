const db = require("quick.db")
const { msg } = require("../../index.js")

module.exports = {
  name: "setwelcomemessage",
  aliases: ["setwmessage", "setwmsg", "setmessage"],

  description: "Change the guild prefix",
  run: async (client, message, args) => {
    //PERMISSION
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("You don't have enough powers")
    }
    
      if(!args[0]) {
      return message.channel.send("Please give the message to set")
    }
    
    let msg = args.slice(0).join(" ")
    
    db.set(`msg_${message.guild.id}`, `${msg}`)
  await message.channel.send(`Welcome message seted to ${msg}`)
    
  }
}