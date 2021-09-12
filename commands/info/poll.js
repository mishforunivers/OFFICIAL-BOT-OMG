const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'poll',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let pollreactions = { // For Multiple Choices
            1: '🇦',
            2: '🇧',
            3: '🇨',
            4: '🇩',
            5: '🇪',
            6: '🇫',
            7: '🇬',
            8: '🇭',
            9: '🇮',
            10: '🇯',
            11: '🇰',
            12: '🇱',
            13: '🇲',
            14: '🇳',
            15: '🇴',
            16: '🇵',
            17: '🇶',
            18: '🇷',
            19: '🇸',
            20: '🇹',
        }
        var questionRegex = /`(.*)`/gmi 
        const questionOrginial = args.join(' ').match(questionRegex)
        const questionEdited = questionOrginial[0].replace("`", "").replace("`", "") // To Remove `` From Question
        if (!questionOrginial || !questionEdited) return message.reply(`No Question Provided`) // If No Question Is Provided

        let options = args.join(' ').slice(questionOrginial[0].length).split(' | ') // To Seperate Every Answer
        let result = ''

        if (options.length <= 1) { // If Only Question Is Provided Without Answer
            result += '<a:YesAA:810231460975869963>: Yes\n'
            result += '<a:NoAA:810231506475548672>: No'
            const embed = new MessageEmbed()
                .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
**${questionEdited}**
<a:YesAA:810231460975869963>: Yes
<a:NoAA:810231506475548672>: No
            `)
            message.channel.send(embed).then(msg => {
                msg.react('<a:YesAA:810231460975869963>') // React To Message
                msg.react('<a:NoAA:810231506475548672>') // React To Message
            })
        } else {
            if (options.length > 20) return message.reply(`You Can't Have More Then 20 Options`) // Discord Limits
            result = options.map((c, i) => {
                return `${pollreactions[i + 1]} ${c}` // To Keep Description
            })

            const embed = new MessageEmbed()
                .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
**${questionEdited}**
${result.join('\n')}
            `)
            message.channel.send(embed).then(msg => {
                options.map(async (c, x) => {
                    msg.react(pollreactions[x + 1]) // React To Message
                })
            })
        }
    }
}
        