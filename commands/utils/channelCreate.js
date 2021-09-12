const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'createchannel',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.permissions.has('MANAGE_CHANNELS')) return message.reply('You dont have permission to do that.');

        const channelNameQuery = args.join(" ");
        if(!channelNameQuery) return message.reply('Bro specify a channel name bruh')

        message.guild.channels.create(channelNameQuery)
            .then(ch => {
                message.channel.send(`Click ${ch} to access the newly created channel.`);
            });
    },
};