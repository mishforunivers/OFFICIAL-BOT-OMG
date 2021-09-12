const Discord = require("discord.js");
const fetch = require("node-fetch")

module.exports = {
  name: 'wyr',
  description: 'what you rather? :DD',

  run : async(client, message, args) => {
 
     const res = await fetch(`https://api.popcatdev.repl.co/wyr`)
            .then(info => info.json()).then(ops => {

 
  const em = new Discord.MessageEmbed()
    .setTitle("Would You Rather")
    .setDescription(`:one: ${ops.ops1}\n\n   OR   \n\n:two: ${ops.ops2}`)
    .setColor("#4169e1")
  message.channel.send(em).then(wyrmessage => {
    wyrmessage.react('1️⃣')
    wyrmessage.react('2️⃣')
  })
      })

  }

}