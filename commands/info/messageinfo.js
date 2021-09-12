const { MessageEmbed } = require('discord.js'); // npm i discord.js
require('discord-reply')
module.exports = {

    name: 'messageinfo',

    run: async (client, msg, args) => {
        try {

        if(!args[0]) return msg.reply('Provide a message ID!')

        if(isNaN(args[0])) return msg.reply("That's not a valid message ID! `Eg- 1234567890`");

        await msg.channel.messages.fetch(args[0]).catch(err => {

            return msg.reply('Message not found in this channel..')

        })

        const message = await msg.channel.messages.cache.get(args[0]);

        const hasImage = message.attachments.size && message.attachments.first().width;

        const embed = new MessageEmbed()

            .setColor(message.member ? message.member.displayHexColor : client.color)

            .setThumbnail(message.author.displayAvatarURL({ format: 'png', dynamic: true }))

            .setImage(hasImage ? message.attachments.first().url : null)

            .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true }))

            .setDescription(message.content)

            .setTimestamp(message.createdAt)

            .setFooter(`ID: ${message.id}| `)

            .addField('Jump', `[Click Here to Jump](${message.url})`);

        return msg.reply(embed);

        } catch(err) {

            return;

        }
    }

};