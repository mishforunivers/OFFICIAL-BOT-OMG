const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'pull',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

        const member = message.mentions.members.first();
        if (!member) return message.reply("Please mention a member.");
        if (!member.voice.channel)
            return message.reply(
                "The member you mentioned is not in vc channel"
            );
            
        if (!message.member.voice.channel)
        return message.reply("Please join a vc channel ")
        member.voice.setChannel(message.member.voice.channel);
        message.channel.send("Member moved.")
    }
}