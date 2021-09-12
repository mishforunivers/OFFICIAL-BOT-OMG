const {
    Client,
    Message,
    MessageEmbed
  } = require('discord.js');
  
  module.exports = {
    name: 'purge-mentions',
    description: 'Deletes an amount of messages containing mentions in the current channel!',
    aliases: ["purgementions", "clear-mentions"],
    usage: '<amount> [limit: 100]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
  
    run: async (client, message, args) => {
      if (!message.member.hasPermission("ADMINISTRATOR" || "MANAGE_CHANNELS")) return message.reply("You do not have perms to use this command!")
  
      const {
        channel
      } = message;
  
      if (!channel.permissionsFor(message.guild.me).has(['MANAGE_MESSAGES']))
        return message.channel.send('I do not have permission to manage messages in the provided channel');
  
  
      const amount = parseInt(args[0]);
      if (isNaN(amount) === true || !amount || amount < 0 || amount > 100)
        return message.channel.send('Please provide a message count between 1 and 100');
  
  
      await message.delete(); // Delete command message
  
      // Find member messages if given
      let messages = (await channel.messages.fetch({
        limit: amount
      })).filter(m => m.mentions.users.size > 0);
  
  
      if (messages.size === 0) {
  
        message.channel.send(
          new MessageEmbed()
          .setTitle('Purge')
          .setDescription(`
                  Unable to find any messages containing mentions. 
                  This message will be deleted after \`10 seconds\`.
                `)
          .addField('Channel', channel, true)
          .addField('Found Messages', `\`${messages.size}\``, true)
          .setFooter(message.member.displayName, message.author.displayAvatarURL({
            dynamic: true
          }))
          .setTimestamp()
          .setColor("RANDOM")
        ).then(msg => msg.delete({
          timeout: 10000
        })).catch(err => console.log(err));
  
      } else {
  
        channel.bulkDelete(messages, true).then(messages => {
          const embed = new MessageEmbed()
            .setTitle('Purge')
            .setDescription(`
                  Successfully deleted **${messages.size}** message(s) containing mentions. 
                  This message will be deleted after \`10 seconds\`.
                `)
            .addField('Channel', channel, true)
            .addField('Message Count', `\`${messages.size}\``, true)
            .addField("Requirement: ", `Must have mentions`, true)
            .setFooter(message.member.displayName, message.author.displayAvatarURL({
              dynamic: true
            }))
            .setTimestamp()
            .setColor("GREEN");
  
          message.channel.send(embed).then(msg => msg.delete({
              timeout: 10000
            }))
            .catch(err => console.log(err));
        });
      }
  
    }
  }