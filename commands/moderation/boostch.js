const { MessageEmbed, Collection } = require('discord.js');
const db1 = require("../../models/boost.js");


module.exports = {
    name : 'setBoostChannel',
    aliases: ["setbc", "setboostchannel", "setboostc"],
    description : 'Setup the booster message channel!!',


    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
      if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send('You do not have admin perms to use this command!');

      const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
      if (!channel) return message.reply('Please provide the channel!');

      await db1.findOne({ guild: message.guild.id }, async(err, data) => {
        if(!data) {
          data = new db1({
            guild: message.guild.id,
            channel: channel.id
          }).save();
          message.channel.send(`The booster message channel has been set as ${channel}!`)
        } else {
          data.channel = channel.id;
          await db1.findOneAndUpdate({ guild: message.guild.id });
          message.channel.send(`The booster message channel has been update to ${channel}!`)
        }
      })

    } 
}