const { Client, Message, MessageEmbed } = require("discord.js");
const Schema = require(`../../models/bio`);
module.exports = {
  name: "bio",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let member = message.mentions.members.first();
    if (!member) {
      member = message.member;
    }
    let data = await Schema.findOne({ User: member.id });
    if (!data) {
      let emnbed = new MessageEmbed()
      .setTitle("ERROR!")
      .setDescription("This member doesnt have any bio yet")
      .setFooter("Use \`--set-bio <bio>\` to set your bio")
      .setColor("RED")
      
      message.channel.send(emnbed)
      
    }
    let embed1 = new MessageEmbed()
      .setTitle(`${member.user.tag}'s Bio`)
      .setDescription(data.Bio)
      .setColor("RANDOM")
      .setFooter(`Use \`--set-bio <bio>\` to set your bio`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }));
    message.channel.send(embed1);
  },
};