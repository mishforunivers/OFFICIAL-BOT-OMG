  
const Discord = require("discord.js");

module.exports = {

  name: "avatar2",
  aliases: ["av2", "ava2"],
  description: "Get avatar of any user",
  run: async (client, message, args) => {
    const member = message.mentions.members.first() || message.member

    let user = message.mentions.users.first() || message.author

    let size = [16, 32, 64, 128, 256, 512, 1024, 2048, 4096]
    let type = ['webp', 'png', 'jpg', 'gif', 'jpeg']

    let embed = new Discord.MessageEmbed()
      .setTitle(`${member.user.tag}'s Avatar`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setImage(user.displayAvatarURL({dynamic: true}))
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL())
      type.forEach(em => {
        embed.addField(em.toUpperCase(), size.map(s => `[${s}](${user.displayAvatarURL({size: s, format: em})})`).join(" | "))
      })



    return message.channel.send(embed)
  }
};