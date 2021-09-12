const { Client, Message, MessageEmbed } = require('discord.js');
const translate = require('@iamtraction/google-translate')
module.exports = {
    name: 'translate',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const query = args.join(" ")
        if(!query) return message.reply("Please specify a text and i will translate")

        const translated = await translate(query, { to: 'en' })
        message.channel.send(translated.text)
    },
};