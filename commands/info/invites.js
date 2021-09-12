const { MessageEmbed } = require("discord.js");
const Client = require("../../index");
module.exports = {
  name: "invites",
  description: "Check your invites in the server!",
  permissions: [""],
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {string[]} args
   */
  run: async (client, message, args) => {
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    let Inv = [];
    const invites = await message.guild.fetchInvites();
    const userInvites = invites.array().filter((o) => {
      if (Inv.includes(o.targetUser)) return;
      Inv.push(o.targetUser);

      return o.inviter.id === user.id;
    });
    let memberInvites = invites.filter(i => i.inviter.id === user.id);
    let content = memberInvites.map(i => i.code).join("\n")
    let userInviteCount = 0;
    for (let i = 0; i < userInvites.length; i++) {
      var invite = userInvites[i];
      userInviteCount += invite["uses"];
    }
    const embed = new MessageEmbed()
    .setTitle("Invite Checker!")
    .setDescription(`${user.user.tag} has ${userInviteCount} invites.`)
    .addField("Invite Codes", content)
    .setColor("RANDOM")
    .setThumbnail(`${user.user.displayAvatarURL({ dynamic: true })}`)
    .setTimestamp()

    message.channel.send(embed)
    }
};