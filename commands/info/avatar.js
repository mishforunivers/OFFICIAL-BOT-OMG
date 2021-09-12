const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
    aliases: [],
  run: async (client, message, args ) => {
      const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;
    const embed = new MessageEmbed()
      .setAuthor(
        member.user.tag,
        member.user.displayAvatarURL({ dynamic: true, size: 1024 })
      )
      .setColor(client.color)
      .setTitle(`**Avatar**`)
      .setDescription(
        `\`Links:\` **[png](${member.user.displayAvatarURL({
          format: "png",
          size: 1024,
        })}) | [jpg](${member.user.displayAvatarURL({
          format: "jpg",
          size: 1024,
        })}) | [gif](${member.user.displayAvatarURL({
          format: "gif",
          size: 1024,
          dynamic: true,
        })}) | [webp](${member.user.displayAvatarURL({
          format: "webp",
          size: 1024,
        })})**`
      )
      .setImage(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .setURL(client.web)
      .setTimestamp();
    return message.reply(embed);
  }
}