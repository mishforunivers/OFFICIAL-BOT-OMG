const Discord = require("discord.js")
module.exports = {
  name : "iosalert",
  description: "Make any alert on the iOS Lock Screen.",
 run: async (client, message, args) => {
  const sentence = args.join(" ")
    if (!sentence) return message.channel.send('Please specify an alert.')
    let embed = new Discord.MessageEmbed()
      .setTitle('iOS Alert')
      .setImage(`https://api.popcatdev.repl.co/alert?text=${encodeURIComponent(sentence)}`)
      .setColor('RANDOM')
      .setTimestamp()
      .setFooter('Read it! it may save your life!');
    message.channel.send(embed)
  }
  }
