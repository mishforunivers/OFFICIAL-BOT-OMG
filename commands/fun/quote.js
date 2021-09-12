const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'quote',
    description: 'shows random quote texts',
    run: async (client, message, args) => {
        const axios = require('axios')
        const body = await axios.get('https://api.tovade.xyz/v1/fun/quote')
        const res = body.data
        const embed = new MessageEmbed()
        .setTitle('New Quote')
        .setColor('RANDOM')
        .setDescription(`${res.content}`)
        .setFooter(`Author: ${res.author}`)
        .setTimestamp()
        message.channel.send(embed)
    }
}
