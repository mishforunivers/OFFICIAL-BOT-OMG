const {MessageEmbed} = require('discord.js')
module.exports=async(roleDelete)=>{ 
        const embed = new MessageEmbed()
        .setTitle(' Role Deleted!')
        .setDescription(`Role: ${roleDelete}\nRole Name: **${roleDelete.name}**\nRole ID: ${roleDelete.id}\nHexcolor: ${roleDelete.hexColor}\nPosition: ${roleDelete.position}`)
        .setColor("RANDOM")
        .setTimestamp()

    let channel = roleDelete.guild.channels.cache.find(ch=>ch.name==="🔗・logs・univers")
    if(!channel) return;
        channel.send(embed)
    }
