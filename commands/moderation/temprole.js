const { Message, MessageEmbed } = require('discord.js');

const ms = require('ms');

module.exports = {
    name: 'temprole',
    aliases: ["timerole"],
    description: "adds a role by duration",
    usage:"--temprole <roleID> <duration>",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(bot, message, args) => {
      if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You dont have permission to do that!");
      if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("\`\`\` I do not have permission to temprole members. Fix this problem before you try again.\`\`\`");

      var tempbanUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
      if (!tempbanUser && args[0]) {
          message.channel.send("\`\`\` I couldn't find this member.\`\`\`");
          return
      }else {
        var temprole = message.mentions.roles.first() ||message.guild.roles.cache.get(args[1])
        if(!temprole) return message.channel.send('No role specified')
          var tempbanTime = args[2];
          if (!tempbanTime) return message.channel.send('\`\`\` Give a time in days (d), hours (h), minutes (m) or seconds (s).\`\`\`');
          tempbanUser.roles.add(temprole).catch(err => {
              if (err) return message.channel.send("Something went wrong");
          });
          message.channel.send(`Succesfully temprolled ${tempbanUser} for ${tempbanTime}.`);

          setTimeout(() => {

            tempbanUser.roles.remove(temprole)
              message.channel.send(`${tempbanUser}'s temprole has ended.`);

          }, ms(tempbanTime));
    }
  }
}