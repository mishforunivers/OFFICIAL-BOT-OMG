const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'allvcmute',
    aliases: ['allvcm'],
    description: 'Mutes every member in the voice channel',
    usage: '--allvcmute [vc channel id]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MUTE_MEMBERS')) return;
        let channel = message.guild.channels.cache.get(args[0]) || message.member.voice.channel;
        if (!channel) return message.channel.send("You must enter a channel ID or be on a voice channel");
        channel.members.filter((x) => !x.permissions.has("ADMINISTRATOR"))
            .forEach((x, index) => {
                x.voice.setMute(true);
            });
        message.channel.send(
            new MessageEmbed()
                .setTitle("Everyone is muted now!")
                .setDescription(`\`${channel.name}\` All members on your channel have been silenced`)
                .setColor("RANDOM")
                .setFooter("Univers Official Bot")
                .setTimestamp()
        )


    }
}