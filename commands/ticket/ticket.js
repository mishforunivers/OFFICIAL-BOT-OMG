const { Client, Message, MessageEmbed } = require('discord.js')
const db = require("quick.db")

module.exports = {
    name : 'ticket',
    /**
     * @param {Client} client
     * @param {Message} message
     */
    run : async(client, message) => {
        const ch = message.guild.channels.cache.find(ch => ch.name === message.author.id)
        if(ch) return message.channel.send('You already have ticket open.')
        message.guild.channels.create(`${message.author.id}`, {
            type : 'text',
            parent : '853641583274098698',
            permissionOverwrites : [
                {
                    id : message.guild.id,
                    deny : ['VIEW_CHANNEL']
                },
                {
                    id : message.author.id,
                    allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'ATTACH_FILES']
                }
            ]
        }).then(async channel => {
            message.reply(`click <#${channel.id}> to view your ticket`)
            channel.send(`${message.author}, welcome to your ticket`)
        
            let channel1 = db.fetch(`modlog_${message.guild.id}`)
        if (channel1 == null) return;

        if (!channel) return;
            const embed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .setColor("RANDOM")
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("Moderation", "Ticket Opened")
            .addField("Ticket Opened", `<#${channel.id}>` )
            .addField("Channel Id ", `${channel.id}`)
            .addField("Opened by", `${message.author.tag}`)
            .addField("Date", message.createdAt.toLocaleString())
            .setTimestamp();

        var sChannel = message.guild.channels.cache.get(channel1)
        if (!sChannel) return;
        sChannel.send(embed)
        })
    }
    }


