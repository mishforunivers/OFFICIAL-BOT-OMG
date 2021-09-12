const Discord = require("discord.js")
module.exports = {
  name : "biden",

run: async(client , message , args) => {
  const sentence = args.join(" ")
    if (!sentence) return message.channel.send('Please specify a query.')
    let embed = new Discord.MessageEmbed()
      .setTitle('Joe Biden New Tweet.')
      .setImage(`https://api.popcatdev.repl.co/biden?text=${encodeURIComponent(sentence)}`)
      .setColor('ORANGE')
      .setFooter('I cant believe Joe said that!');
    message.channel.send(embed)
  }
  }