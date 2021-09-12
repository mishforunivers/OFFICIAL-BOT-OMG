const premiumSchema = require("../../models/premium")
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'del-premium',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.author.id !== '766242519817912340') return;

        const member = 
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);

        if (!member) return message.reply("Please specify a member");

        premiumSchema.findOne({
            User: member.id
        }, async(err, data) => {
            if(!data) return message.reply("This Person wasnt added to premium access!"
            );

            data.delete();
            message.channel.send("User removed from premium feature!")
        }
        )
},
}