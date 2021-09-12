const { Client, Message, MessageEmbed } = require('discord.js');
const math = require('mathjs')
module.exports = {
    name: 'math',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            message.channel.send(
                new MessageEmbed()
                .setTitle('Math Solution.')
                .addField('Question', args.join(" "))
                .addField('Solution', math.evaluate(args.join(" ")))
                .setTimestamp()
            )
        } catch (err) {
            message.channel.send('Your question is not valid')
        }
    }
}