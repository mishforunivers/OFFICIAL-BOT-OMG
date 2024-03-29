const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'allvcunmute',
    aliases: [''],
    description: '',
    usage: '',
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
                x.voice.setMute(false);
            });
        message.channel.send(
            new MessageEmbed()
            .setTitle("Everyone is unmuted now!")
            .setDescription(`\`${channel.name}\` All members on your channel have been unmuted`)
            .setColor("RANDOM")
            .setFooter("Univers Official Bot")
            .setTimestamp()
        )


    }
}