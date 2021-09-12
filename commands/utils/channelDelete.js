const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'deletechannel',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.permissions.has('MANAGE_CHANNELS')) return message.reply('You dont have permission to do that.');

        const channelTarget = message.mentions.channels.first() || message.channel;

        channelTarget.delete()
             .then(ch => {
                message.author.send(`**${ch.name}** channel has been deleted`)
             });
    },
};