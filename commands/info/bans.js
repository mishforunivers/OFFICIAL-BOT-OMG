const { Client, Message, MessageEmbed } = require('discord.js');
const discord = require("discord.js")

module.exports = {
    name: 'bans',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) return;
        var amount = 1;
        const fetchBans = message.guild.fetchBans();
        const bannedMembers = (await fetchBans)
        .map((member) => `> __${amount++}.__ **${member.user.tag}** | (*${member.user.id}*)`)
        .join("\n");
        const bansEmbed = new discord.MessageEmbed()
        .setAuthor(`Bans for ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
        .setDescription(`${bannedMembers}`)
        .setFooter(`Amount: ${amount - 1}`)
        .setTimestamp()
        .setColor("RED")
        message.channel.send(bansEmbed)
    },
};
