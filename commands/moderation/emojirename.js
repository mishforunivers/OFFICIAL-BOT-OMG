const Discord = require('discord.js')
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "emojirename",
  description: "rename an emoji",
  aliases: ["renameemoji"], 
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_EMOJIS")) {
return message.channel.send(`You Don't Have Permission To Use This Command`)
}
if (!message.guild.me.hasPermission("MANAGE_EMOJIS")) {
return message.channel.send(`I Don't Have Permission To manage emojis`)
}
if (!args[0]) return message.channel.send("Emote is a required argument that is missing.");
if (!args[1]) return message.channel.send("Name is a required argument that is missing.")
let emo = args[0].match(/(?<=<?a?:?\w{2,32}:)\d{17,19}(?=>?)/gi)[0]
if (!emo) return message.channel.send("Emote is a required argument that is missing.")
if (message.guild.emojis.cache.get(emo)) {
  emo = message.guild.emojis.cache.get(emo)
} else {
  return message.channel.send(" Emoji not found")
}
if (!emo.name || !emo.id) return message.channel.send("Invalid emote argument");
console.log(emo)
   try {
     emo.setName(args.slice(1).join("_"))
     message.channel.send("The name for the emoji has been changed to " **+ args.slice(1).join("_") + "**")
   } catch (err) {
     message.channel.send("**An Error occured**")
   }
  }
}