const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'membercount',
    aliases: ['mc'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    run: async(client, message, args) => {
        let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`Member Count of ${message.guild}`, message.guild.iconURL({ dynamic: true }))
        .setTitle("Members")
        .setDescription (`Total: ${message.guild.members.cache.size}\n Members: ${message.guild.members.cache.filter(member => !member.user.bot).size}\nBots: ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setFooter(`Requested by ${message.author.tag}`)
       
        message.channel.send(embed)
       }
}