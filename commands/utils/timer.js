const { MessageEmbed } = require('discord.js');
const parse = require('parse-duration');
const ms = require('humanize-duration')

module.exports = {
        name: 'timer',
        description: 'Allows you to create a timer.',
        aliases: [`countdown`],
    
    run: async(Client, message, args) => {
        let embed3 = new MessageEmbed()
            .setTitle("Error!")
            .setDescription(`Please provide a valid time!`)
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
            .setColor("RANDOM");

        if ([null, Infinity].includes(parse(args[0]))) return message.channel.send(embed3);

        const end = Date.now() + parse(args[0]);

        const embed = new MessageEmbed()
            .setAuthor(`ACTIVE TIMER`)
            .setDescription(`⏰ **Time**: ${ms(end - Date.now(), {round: true})}`)
            .setColor("RANDOM")
            .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))

        const msg = await message.channel.send(embed);

        const timer = setInterval(() => {
            const embed2 = new MessageEmbed()
                .setAuthor(`ACTIVE TIMER`)
                .setDescription(`⏰ **Time**: ${ms(end - Date.now(), { round: true })}`)
                .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
                .setTimestamp()
                .setColor("RANDOM");

            if (Date.now() > end) {
                const done = new MessageEmbed()
                .setTitle("Timer!")
                    .setDescription(`Timer has ended!`)
                    .setFooter(`${message.guild.name} |  `, message.guild.iconURL({ dynamic: true }))
                    .setTimestamp()
                    .setColor("RANDOM");
                clearInterval(timer)
                return msg.edit(done)
            } else msg.edit(embed2)
        }, 5000);
    },
};