const Discord = require('discord.js');

const db = require('quick.db');

module.exports = {
    name: "warn",
    description: "Warn a member",

    async run (client, message, args) {
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return;

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!member) return message.channel.send('Please specify a user, via mention or ID');

        if(member.bot) return message.channel.send('You can\'t warn bots');



        var reason = args.slice(1).join(" ");

        if(!reason) reason = 'No reason';

        var warnings = db.get(`warnings_${message.guild.id}_${member.id}`);




        const warnedEmbed = new Discord.MessageEmbed()
        .setTitle('Warning.')
        .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}`)
        .setColor('#00FF00')
        .setDescription(`${member.user} has been warned  **(${reason})**`) 
        .setFooter("Good luck for next time")

        if(warnings === null) {
            db.set(`warnings_${message.guild.id}_${member.id}`, 1);
            member.send(warnedEmbed)
            await message.channel.send()
        }

        if(warnings !== null){
            db.add(`warnings_${message.guild.id}_${member.id}`, 1)
            db.set(`reason_${message.guild.id}_${member.id}`, reason);
            member.send(`You were warned in ${message.guild.name} for the following reason: \`${reason}\``)
         
            await message.channel.send(warnedEmbed)
        }
        client.modlogs(
            {
            Member: member,
            Action: 'Warn',
            Color: "YELLOW",
            Reason: reason,
        },
         message
        );
    }
}