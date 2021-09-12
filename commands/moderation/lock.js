const Discord = require('discord.js');
const { Console } = require('console');


module.exports = {
        name: "lock",
        description: "lock channel",
    run: async (bot, message, args) => {
        let lockPermErr = new Discord.MessageEmbed()
        .setTitle("User Permission Error!")
        .setDescription(" You don't have permissions to do that")
        .setTimestamp()
        
        if(!message.channel.permissionsFor(message.member).has("MANAGE_CHANNELS") ) return message.channel.send(lockPermErr);

        let channel = message.channel;

        try {
            message.guild.roles.cache.forEach(role => {
                channel.createOverwrite(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e);
        }
        const embed = new Discord.MessageEmbed()
        .setTitle("Channel lock")
        .setDescription(`Channel **${channel.name}** has been locked`)
        .setColor("YELLOW")
        .setTimestamp()
        message.channel.send(embed);


    }
}