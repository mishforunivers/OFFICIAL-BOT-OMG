const { client, Message, MessageEmbed } = require("discord.js");
const config= require("../../config.json")

  
   module.exports = {
    name: 'softban', 
    category: "moderation",
    description: 'Kicks a user and deletes all their messages in the past 7 days',
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, [member = '', ...reason] ) => {
    try{
    if (!message.member.hasPermission(`BAN_MEMBERS`)) {
        return message.channel.send(` You don't have the permissions to use this command [BAN_MEMBERS]!`)
    }
    
    if (!message.guild.me.hasPermission("BAN_MEMBERS"))
    return message.channel.send(
      "I need \`BAN_MEMBERS\` or \`ADMINISTRATOR\` permission to run this command!"
    )  
    if (!member.match(/\d{17,19}/)){
        return message.channel.send(` | ${message.author}, Please profilde the ID or mention the user to softban.`);
      };
     
      member = await message.guild.members
      .fetch(member.match(/\d{17,19}/)[0])
      .catch(() => null);
       
      if (!member){
        return message.channel.send(` | ${message.author}, User could not be found! Please ensure the supplied ID is valid.`);
      } else if (member.id === message.author.id){
        return message.channel.send(` | ${message.author}, You cannot softban yourself!`);
      } else if (member.id === client.user.id){
        return message.channel.send(` | ${message.author}, Please don't softban me!`);
      } else if (member.id === message.guild.ownerID){
        return message.channel.send(` | ${message.author}, You cannot softban a server owner!`);
      } else if (config.ownerID.includes(member.id)){
        return message.channel.send(` | ${message.author}, No, you can't softban my developers through me!`);
      } else if (message.member.roles.highest.position < member.roles.highest.position){
        return message.channel.send(` | ${message.author}, You can't softban that user! He/She has a higher role than yours`);
      } else if (!member.bannable){
        return message.channel.send(` | ${message.author}, I couldn't softban that user!`)
      };
  
      return message.guild.members.ban(member, { reason:  `SoftBanned By ${message.author.tag} Reason: ${reason.join(' ') || 'Unspecified'}`, days: 7 })
      .then(() => message.guild.members.unban(member, { reason: 'User Was SoftBanned' }))
      .then(() => message.channel.send(`Successfully Softbanned **${member.user.tag} \nReason: \`${reason.join(' ') || 'Unspecified'}\`**`))
      .catch(() => message.channel.send(` | ${message.author}, Unable to softban **${member.user.tag}**!`))
    } catch (err) {
      console.log(Error)
      return message.channel.send(`soft banningW.....`).then((msg) => {
          setTimeout(() => {
              msg.edit(`An Unexpected Error Occured`);
          }, 3000)
  })
}
  }
}