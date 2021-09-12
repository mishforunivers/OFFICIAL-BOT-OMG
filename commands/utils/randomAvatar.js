const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'randomavatar',
  /**
   * @param {Client} client
   * @param {Message} message
   */
  run: async (client, message,) => {
      const user = client.users.cache.random();

      message.channel.send(
          new MessageEmbed()
          .setTitle('Random Avatar')
          .setColor("RANDOM")
          .setFooter(`${user.tag}'s avatar.`)
          .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
          .setTimestamp()
      )
  }
  }