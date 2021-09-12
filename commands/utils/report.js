const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'report',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const owner = client.users.cache.get('766242519817912340');

        const query = args.join(" ");
        if(!query) return message.reply('Please specify query');

        const reportEmbed = new MessageEmbed()
        .setTitle('New Report!')
        .addField('Author', message.author.toString(), true)
        .addField('Guild', message.guild.name, true)
        .addField('Report', query)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();

        owner.send(reportEmbed);
    }
}