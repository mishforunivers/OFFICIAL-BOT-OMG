const {MessageEmbed} = require('discord.js')
module.exports=async(oldRole, newRole)=>{ 
    oldRole.name !== newRole.name
        const embed = new MessageEmbed()
        .setTitle(' Role Name changed')
        .setDescription(`${oldRole}__ \n\n**Before:** \`${oldRole.name}\`
        **After:** \`${newRole.name}\` **Role ID:** \`${newRole.id}\``)
        .setColor("RANDOM")
        .setTimestamp()

    let channel = oldRole.guild.channels.cache.find(ch=>ch.name==="🔗・logs・univers")
    if(!channel) return;
        channel.send(embed)
}