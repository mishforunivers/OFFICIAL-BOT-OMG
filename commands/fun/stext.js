const { Client, Message, MessageEmbed } = require('discord.js');
const supr = require('superscript-text')
module.exports = {
    name: 'stext',
    aliases: ['stext'],
    description: 'Superscript your text',
    usage: '<text>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
    const text = args.join(' ')
    if(!text) return message.Reply(`Please provide some text`)
    if(text.includes('@')) return message.Reply(`${client.error}`)
    message.channel.send(supr(text))
    }
}