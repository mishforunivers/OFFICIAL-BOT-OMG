const { MessageEmbed, Discord } = require('discord.js')

const db = require('quick.db')

module.exports = {
    name: 'accept',
    category: 'Suggestions',
    description: 'Accepts a suggestion!',
    aliases: [],
    usage: 'accept <suggestion id>',
    example: 'accept 849698926752910586',
    userperms: ['MANAGE_GUILD'],
    botperms: ['MANAGE_CHANNELS'],
    run: async (client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send('You cant use this command')
        }
        let channel = await db.fetch(`suggestion_${message.guild.id}`);

        if (channel === null) return message.channel.send('No suggestion channel is set run =setsuggestion to make one');

        if (channel === null) return;

        const rgx = /^(?:<@!?)?(\d+)>?$/;
        const messageID = args[0];
        const replyQuery = args.slice(1).join(' ') || 'No reason';



        const number = new MessageEmbed()
            .setDescription(`Please use a valid message ID.`)
            .setColor('FF2052')

        const id = new MessageEmbed()
            .setDescription('You forgot to specify a message ID.')
            .setColor('FF2052')

    const query = new MessageEmbed()
            .setDescription(`You forgot to specify the reason.`)
            .setColor('FF2052')

        const reply = new MessageEmbed()
            .setDescription(`Successfully accepted the suggestion.`)
            .setColor('00FFFF')

        const noChannel = new MessageEmbed()
            .setDescription(`No suggestion channel found.`)
            .setColor('FF2052')

        const noMessage = new MessageEmbed()
            .setDescription(`I cannot find any message with that ID, please use a valid message ID.`)
            .setColor('FF2052')

        if (!messageID) return message.channel.send(id);
        if (!rgx.test(messageID)) return message.channel.send(number);
        if (!replyQuery) return message.channel.send(query)

        try {

            const suggestionChannel = message.guild.channels.cache.get(channel)
            if (!suggestionChannel) return message.channel.send(noChannel)

            const suggestedEmbed = await suggestionChannel.messages.fetch(messageID).catch(error => {
                const noMessage = new MessageEmbed()
                    .setDescription(`I cannot find any message with that ID, please use a valid message ID.`)
                    .setColor('FF2052')
                return message.channel.send(noMessage);
            })

            const data = suggestedEmbed.embeds[0];

            const replyEmbed = new MessageEmbed()
                .setAuthor(`${data.author.name}`, `${data.author.iconURL}`)
                .setTitle('Suggestion')
                .setDescription(`${data.description}`)
                .setColor('GREEN')
                .addField(`Accepted by ${message.author.tag}`, replyQuery)
                .setFooter(`Status: accepted | ID: ${messageID}`)
                .setTimestamp();

            suggestedEmbed.edit(replyEmbed);
            suggestedEmbed.reactions.removeAll();
            message.channel.send(reply);

            const user = await client.users.cache.find((u) => u.tag === data.author.name)

            const embed = new MessageEmbed()
                .setDescription(`Your [suggestion](https://discord.com/channels/${message.guild.id}/${channel}/${messageID}) has been accepted.`)
                .setColor('GREEN')
            user.send(embed)

        } catch (err) {
            console.log(err);
            return;
        }
    }
}