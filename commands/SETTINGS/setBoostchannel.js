const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("quick.db")
module.exports = {
    name: 'setboost',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle('**invalid usage**')
        .setColor('ff0000')
        .setDescription(`\`\`\`setboost <channel> <message>\`\`\``)


        const embed3 = new MessageEmbed()
        .setTitle('you are missing the `ADMINISTARTOR` permission')
        .setColor('ff0000')

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed3)
        const channel = message.mentions.channels.first();
        const msg = args.slice(1).join(' ');
        if (!args[0]) return message.channel.send(embed)
    
     
    
        if (channel) {
            db.set(`boost_${message.guild.id}`, channel.id)
            db.set(`boostmsg_${message.guild.id}`, msg)
    
            const embed2 = new MessageEmbed()
                .setDescription(`**CHANNEL:** <#${channel.id}>\n**MESSAGE:** @member, ${msg}`)
                .setFooter(`Channel set by: ${message.author.username}`)
                .setTimestamp()
                .setColor('ff0000')
    
            message.channel.send(embed2)
            const boostembed = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
            .setThumbnail('https://cdn.discordapp.com/emojis/660789028861509633.png?v=1')
            .setDescription(`@member, ${msg}`)
            .setColor('#ff00f7')
            .setFooter('this is how it would look like!')
            message.channel.send(boostembed)
        } else if (args[0] === 'off') {
    
            db.delete(`boost_${message.guild.id}`)
            db.delete(`boostmsg_${message.guild.id}`)
            const embed = new MessageEmbed()
            .setColor('ff0000')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`:thumbsup: Boost channel and message is \`off\` for this server`)
          message.channel.send(embed)
        }
    }
}