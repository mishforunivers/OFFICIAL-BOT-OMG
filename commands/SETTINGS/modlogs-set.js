const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require("../../models/modlogs");

module.exports = {
    name: 'set-logs',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) return;
        const channel = message.mentions.channels.first() || message.channel;

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) data.delete();
            new Schema({
                Guild: message.guild.id,
                Channel: channel.id,
            }).save();
            message.channel.send(
                `${channel} has been saved as the modlogs channel.`)
        })
    }
}