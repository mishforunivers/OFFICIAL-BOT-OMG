const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'iqrate', 
     description: "Shows how smart your , i hope your not dumb",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let user = message.mentions.users.first() || message.author;
        const rate = Math.floor(Math.random() * (100 - 1 + 1) + 1);

        if(user == message.author) {
            const IQEmbed = new MessageEmbed()
            .setColor('#00000')
            .setTitle('Your IQ Rate')
            .setDescription(`Your IQ is **${rate}** `)
            .setFooter(`${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
            )
            message.channel.send(IQEmbed)
        } else {
            const IQEmbed2 = new MessageEmbed()
            .setColor('#00000')
            .setTitle(`${user.username}'s IQ`)
            .setDescription(`${user} IQ is **${rate}** `)
            .setFooter(`${user.tag}`,
            user.displayAvatarURL({ dynamic: true })
            )
            message.channel.send(IQEmbed2)
        }

    }
}