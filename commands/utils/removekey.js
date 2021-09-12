const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('../../models/keys');

module.exports = {
     name: 'removekey',
     description: 'Remove a user key!',
     /** 
      * @param {Client} client 
      * @param {Message} message 
      * @param {String[]} args 
      */

      run: async(client, message, args) => {
          // add a check so that only you can use
          const user = message.mentions.users.first();
          if(!user) return message.reply("Please provide the user!");

          db.findOne({ user: user.id }, async(err, data) => {
              if(!data) return message.reply('That user does not have a key yet!');

              await db.findOneAndDelete({ user: user.id });
              message.channel.send('That user was successfully removed!')
          })
      }
}