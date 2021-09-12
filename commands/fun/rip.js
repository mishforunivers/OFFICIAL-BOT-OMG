const { Client, Message, MessageEmbed } = require('discord.js');
const discord = require("discord.js");

module.exports = {
    name: 'rip',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
 
    let rip = new discord.MessageAttachment("https://i.imgur.com/w3duR07.png");
    if (!rip) return message.reply(client.data.language.command_fun_rip_message_attachment_not_rip);
    message.channel.send(rip);

    }
}