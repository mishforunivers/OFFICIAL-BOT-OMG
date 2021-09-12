const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'pin',
    description: "Pins the Message in the channel",
    usage: "[--ping <messageID>]",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You dont have permission to do that ");
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply("I dont have permission to do that [MANAGE_MESSAGES]");

        const pinID = args.join(" ");

        if(args.length < 1) return message.channel.send("Please provide a message id");

         message.channel.messages.fetch(pinID).then(d => {
            d.pin().catch(err => {
                message.channel.send("Failed to pin the message");
                console.log(err)
            })
            message.channel.send(`Message successfully pinned! Message ID: \`${pinID}\``)
        }).catch(() => {
            message.channel.send(`${pinID} is not a valid message id!`)
        })

    }
}