const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "setwelcome",
  usage: "setwelcome <#channel>",
  description: "Set the welcome channel",
  run: async(client, message, args) => {
    
    let channel = message.mentions.channels.first()
    
    if(!channel) {
      return message.channel.send("Please Mention the channel first")
    }
    
    //Now we gonna use quick.db
    
    db.set(`welchannel_${message.guild.id}`, channel.id)
    
    message.channel.send(`Welcome Channel is seted as ${channel}`)
  }
}