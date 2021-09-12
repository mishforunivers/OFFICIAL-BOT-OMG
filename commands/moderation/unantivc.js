const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unantivc',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.permissions.has("MANAGE_ROLES")) return;
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!target) return message.reply("Please specify a member!");

        const role = message.guild.roles.cache.find((role) => role.name.toLowerCase() === 'antivc');
        if(!role) return message.reply("The role doesnt exists!")

        if(!target.roles.cache.has(role.id)) return message.reply(`${target} is not antivced`);

        target.roles.remove(role.id)
        message.channel.send(`${target} has been unAntivced`)
    }
}