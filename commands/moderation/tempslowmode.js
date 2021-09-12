const { Message, MessageEmbed } = require('discord.js');
const Discord = require("discord.js")
const ms = require('ms');

module.exports = {
    name: 'tempslowmode',
    aliases: ["tslowmode"],
    description: "Slowmodes channel with duration",
    usage:"--tempslowmode <Channel_MENTION | ID> <Slowmode_time> <TIME>",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You dont have permission to do that!");
      if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("\`\`\` I do not have permission to tempslowmode members. Fix this problem before you try again.\`\`\`");

      var tempchannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) ;
      if (!tempchannel && args[0]) {
          message.channel.send(new Discord.MessageEmbed()
          .setTitle("Missing Arguement")
          .setDescription("<a:No:876198779798310952> Specify a Channel for Tempslowmode! EXAMPLE: -- \n`--tempslowmode <Channel_MENTION | ID> <Slowmode_time> <TIME> ` -- tempslowmodes Channels ")
          .setColor("RED")
          .setTimestamp());
          return
      }else {
        const raw = args[1]
        const milliseconds = ms(raw)
        if(isNaN(milliseconds)) return message.channel.send(new Discord.MessageEmbed()
        .setTitle("Missing Arguement")
        .setDescription("<a:No:876198779798310952> Specify a valid Number of slowmode ! EXAMPLE: -- \n`--tempslowmode <Channel_MENTION | ID> <Slowmode_time> <TIME> ` -- tempslowmodes Channels ")
        .setColor("RED")
        .setTimestamp());
          var tempbanTime = args[2];
          if (!tempbanTime) return message.channel.send('\`\`\` Give a time in days (d), hours (h), minutes (m) or seconds (s).\`\`\`');
          tempchannel.setRateLimitPerUser(milliseconds / 1000).catch(err => {
              if (err) return message.channel.send(new Discord.MessageEmbed()
              .setTitle("Uh Oh!")
              .setDescription(`<a:No:876198779798310952> Something Went Wrong! Error - ${err}`)
              .setColor("RED")
              .setTimestamp());
          });
          message.channel.send(new Discord.MessageEmbed()
          .setTitle("Done!")
          .setDescription(`<a:Yess:876198935939657750> Updated Channel! -- tempslowmode is  is now Enabled for ${tempchannel.name} -- Time of tempslowmode is: ${tempbanTime}`)
          .setColor("GREEN")
          .setTimestamp());

          setTimeout(() => {
            
            tempchannel.setRateLimitPerUser(0)
              message.channel.send(new Discord.MessageEmbed()
              .setTitle("Done!")
              .setDescription(`<a:Yess:876198935939657750> Updated Member! -- tempslowmode is  is now Ended for **${tempchannel.name}** -- Time: ${tempbanTime}`)
              .setColor("GREEN")
              .setTimestamp());

          }, ms(tempbanTime));
    }
  }
}