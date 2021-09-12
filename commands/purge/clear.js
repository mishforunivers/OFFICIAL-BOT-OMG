const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'clear',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply('You dont have permission to do that!');
        const member = message.mentions.members.first();
        const messages = message.channel.messages.fetch();

        if(member) {
            const userMessages = (await messages).filter(
                (m) => m.author.id === member.id
                );
            await message.channel.bulkDelete(userMessages);
            message.channel.send(`${member} messages has been cleared`);
        } else {
            if (!args[0])
            return message.channel.send(
                "Please specify a number of messages to delete"
            );
          if (isNaN(args[0])) return message.reply("Only numbers are allowed.")
          if (parseInt(args[0]) > 100)
          return message.reply(
              "The max amount of messages that i can delete is 100"
          );
          await message.channel
            .bulkDelete(parseInt(args[0]) + 1)
            .catch((err) => console.log(err));
            message.channel.send("Deleted " + args[0] + " messages. ")
        }
    }
}