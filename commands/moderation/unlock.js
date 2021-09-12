const Discord = require('discord.js');
const { Console } = require('console');

module.exports = {
        name: "unlock",
        description: "unlock channel",
    run: async (bot, message, args) => {
        let lockPermErr = new Discord.MessageEmbed()
        .setTitle("User Permission Error!")
        .setDescription(" You don't have permissions to use this! ")
        
        if(!message.channel.permissionsFor(message.member).has("MANAGE_CHANNELS") ) return message.channel.send(lockPermErr);

        let channel = message.channel;

        try {
            message.guild.roles.cache.forEach(role => {
                channel.createOverwrite(role, {
                    SEND_MESSAGES: true,
                    ADD_REACTIONS: true
                });
            });
        } catch (e) {
            console.log(e);
        }
        const embed = new Discord.MessageEmbed()
        .setTitle("Channel unlock")
        .setDescription(`Channel **${channel.name}** has been unlocked`)
        .setColor("GREEN")
        .setTimestamp()
        message.channel.send(embed);
    }
}