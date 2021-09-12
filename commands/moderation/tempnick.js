const { Message, MessageEmbed } = require('discord.js');
const Discord = require("discord.js")
const ms = require('ms');

module.exports = {
    name: 'tempnick',
    aliases: ["timenick"],
    description: "adds a role by duration",
    usage:"--tempnick <roleID> <duration>",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(bot, message, args) => {
      if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("You dont have permission to do that!");
      if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("\`\`\` I do not have permission to tempnick members. Fix this problem before you try again.\`\`\`");

      var tempbanUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
      if (!tempbanUser && args[0]) {
          message.channel.send(new Discord.MessageEmbed()
          .setTitle("Missing Arguement")
          .setDescription("<a:No:876198779798310952> Specify a Member for TempNick! EXAMPLE: -- \n`--tempnick <MEMBER_MENTION | ID> <NICKNAME> <TIME> ` -- TempNicks user :)")
          .setColor("RED")
          .setTimestamp());
          return
      }else {
        var tempnick = args[1]
        if(!tempnick) return message.channel.send(new Discord.MessageEmbed()
        .setTitle("Missing Arguement")
        .setDescription("<a:No:876198779798310952> Specify a Nickaname for TempNick! EXAMPLE: -- \n`--tempnick <MEMBER_MENTION | ID> <NICKNAME> <TIME> ` -- TempNicks user :)")
        .setColor("RED")
        .setTimestamp())
          var tempbanTime = args[2];
          if (!tempbanTime) return message.channel.send('\`\`\` Give a time in days (d), hours (h), minutes (m) or seconds (s).\`\`\`');
          tempbanUser.setNickname(tempnick).catch(err => {
              if (err) return message.channel.send(new Discord.MessageEmbed()
              .setTitle("Uh Oh!")
              .setDescription(`<a:No:876198779798310952> Something Went Wrong! Error - ${err}`)
              .setColor("RED")
              .setTimestamp());
          });
          message.channel.send(new Discord.MessageEmbed()
          .setTitle("Done!")
          .setDescription(`<a:Yess:876198935939657750> Updated Member! -- Tempnick is  is now Enabled for ${tempbanUser} -- Nickname was: **${tempnick}** -- Time of TempNick was: ${tempbanTime}`)
          .setColor("GREEN")
          .setTimestamp());

          setTimeout(() => {

            tempbanUser.setNickname(null)
              message.channel.send(new Discord.MessageEmbed()
              .setTitle("Done!")
              .setDescription(`<a:Yess:876198935939657750> Updated Member! -- Tempnick is  is now Ended for ${tempbanUser} -- Nickname: **${tempnick}** -- Time: ${tempbanTime}`)
              .setColor("GREEN")
              .setTimestamp());

          }, ms(tempbanTime));
    }
  }
}