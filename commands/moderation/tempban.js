const Discord = require('discord.js');
const ms = require('ms');
module.exports = {
    name: "tempban",
    aliases: ["tban"],
    description: "Ban a member for a specified time!",
    usage: "<user> <time (s/m/h/d)>",
    run: async (client, message, args, emojis, prefix, noPermsEmbed, errorEmbed) => {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(noPermsEmbed);
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("\`\`\` I do not have permission to tempban members. Fix this problem before you try again.\`\`\`");

        var tempbanUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
        if (!tempbanUser && args[0]) {
            message.channel.send("\`\`\` I couldn't find this member.\`\`\`");
            return;
        } else if (tempbanUser) {
            if (tempbanUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("\`\`\` You can not tempban a staff member.\`\`\`");

            var tempbanTime = args[1];
            if (!tempbanTime) return message.channel.send('\`\`\` Give a time in days (d), hours (h), minutes (m) or seconds (s).\`\`\`');
            tempbanUser.ban().catch(err => {
                if (err) return message.channel.send(errorEmbed);
            });
            message.channel.send(`Succesfully tempbanned ${tempbanUser} for ${tempbanTime}.`);

            setTimeout(() => {

                message.guild.members.unban(tempbanUser);
                message.channel.send(`${tempbanUser}'s tempban has ended.`);

            }, ms(tempbanTime));

            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(tempbanUser.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("Moderation", "Temp Ban")
                .addField("User Banned", tempbanUser.user.username)
                .addField("Banned by", message.author.username)
                .addField("Duration", tempbanTime)
                .addField("Date", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        }
    }
}