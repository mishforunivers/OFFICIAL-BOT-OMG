const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "position",
  /**
   * @param {Client} client
   * @param {Message} message
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first();

    if (!member)
      return message.reply({
        content:
          "Please specify a member of whom you want to see the position!",
      });

    const members = message.guild.members.cache
      .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
      .array();

    const position = new Promise((ful) => {
      for (let i = 1; i < members.length + 1; i++) {
        if (members[i - 1].id === member.id) ful(i);
      }
    });

    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("2F3136")
          .setDescription(
            `${member} is the ${await position} member to join the server!`
          ),
      ],
    });
  },
};