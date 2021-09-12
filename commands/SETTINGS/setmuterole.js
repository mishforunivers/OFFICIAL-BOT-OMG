const Discord = require("discord.js")
const muterole = require("../../models/muterole");

module.exports = {
  name: "setmuterole",
  category: "settings",
  description: "Set the mute role for the server",
  usage: "<role>",
  aliases: ["set-mute-role", "setmrole"],
  permissions: ["MANAGE_GUILD"],
  run: (client, message, args) => {
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    if (!role)
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle("Missing Arguement")
      .setDescription("<a:No:876198779798310952> Specify an Role to save as Mute Role! EXAMPLE: -- \n`--setmuterole <ROLE_ID | MENTION | ` -- sets Mute role ")
      .setColor("RED")
      .setTimestamp());
    message.channel.send(new Discord.MessageEmbed()
    .setTitle("Done!")
    .setDescription(`<a:Yess:876198935939657750> Updated Settings! -- Added ${role} is now saved as mute role! TIP: Use --mute <MEMBER> `)
    .setColor("GREEN")
    .setTimestamp());

    muterole
      .findOneAndUpdate(
        { Guild: message.guild.id },
        { Role: role.id },
        { upsert: true }
      )
      .exec();
  },
};