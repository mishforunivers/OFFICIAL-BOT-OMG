const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'antivc',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.permissions.has("MANAGE_ROLES")) return;

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!target) return message.reply("Please specify a member!");

        let role = message.guild.roles.cache.find((role) => role.name.toLowerCase() === 'antivc');
        if(!role) {
            try {
                message.channel.send('Attempting to create a antivc role!');
                role = await message.guild.roles.create({
                    data: {
                        name: 'AntiVC',
                        permissions: []
                    }
                })
    
                message.guild.channels.cache.filter((c) => c.type === 'voice').forEach(async (channel) => {
                    await channel.createOverwrite(role, {
                        VIEW_CHANNEL: true,
                        CONNECT: false,
                        SPEAK: false
                    })
                })
    
                message.channel.send('Role has been created ')
            
        } catch (error) {
        console.log(error)
       }
    }
    await target.roles.add(role.id);
    message.channel.send(`${target} has been anti vc-ed!`)
}
}