const { MessageEmbed } = require('discord.js')

const db = require('quick.db')


module.exports = {
    name: 'suggest',
    category: 'Suggestions',
    description: 'Suggests something!',
    aliases: [],
    usage: 'suggest <string>',
    example: 'suggest Add Mee6 to the server',
    userperms: [],
    botperms: ['MANAGE_CHANNELS'],
    run: async (client, message, args) => {

        let channel = await db.fetch(`suggestion_${message.guild.id}`);
        if (channel === null) return message.channel.send('There is no suggestion channel run --setsuggestion to set one');

        const suggestionQuery = args.join(" ");
        if (!suggestionQuery) return message.channel.send("Please Suggest Something.");

        const embed = new MessageEmbed()

        .setDescription('Processing...')

        const done = new MessageEmbed()
            .setDescription(` Your suggestion was successfully sent to <#${channel}>!`)
            .setColor("BLUE")

        message.channel.send(done)
        let msgEmbed = await message.guild.channels.cache.get(channel).send(embed)
        await msgEmbed.edit(new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${suggestionQuery}`)
            .setColor("00FFFF")
            .setFooter(`Status: pending | ID ${msgEmbed.id}`)
            .setTimestamp()
        )

        await msgEmbed.react('👍')
        await msgEmbed.react('👎')
    }
}