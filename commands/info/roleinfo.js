const { Client, Message, MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'roleinfo',
    aliases: ["rinfo"],
    description: "shows role infos",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
const role1 = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

        if(!role1)
        return message.reply(`Please provide a role!! Example: \`--roleinfo [Role id or mention]\``)
const pos = (message.guild.roles.cache.size - role1.position)
        const embed = new MessageEmbed()
        
        .setTitle(`Role Info For ${role1.name}`)
        .addField('Name', role1, true)
        .addField('ID', `\`${role1.id}\``, true)
        .addField('Color', `\`${role1.hexColor.toUpperCase()}\``, true)
        .addField('Users Having The Role', `\`${role1.members.size}\` Users`, true)
        .addField('Position', `\`${pos}\``, true)
        .addField('Creation On', `\`${moment(role1.createdAt).format('DD/MMM/YYYY')}\``, true)
        .addField(`Hoisted`, role1.hoist, true)
        .setColor("RANDOM")

        message.channel.send(embed)
}
    }
