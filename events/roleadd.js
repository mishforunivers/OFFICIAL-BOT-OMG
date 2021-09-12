const {MessageEmbed} = require('discord.js')
module.exports=async(roleCreate)=>{ 
        const embed = new MessageEmbed()
        .setTitle('New Role Created!')
        .setDescription(` Role: ${roleCreate}\nRole Name: ${roleCreate.name}\nRole ID: ${roleCreate.id}\nHexcolor: ${roleCreate.hexColor}\nPosition: ${roleCreate.position}`)
        .setColor("GREEN")
        .setTimestamp()

    let channel = roleCreate.guild.channels.cache.find(ch=>ch.name==="🔗・logs・univers")
    if(!channel) return;
        channel.send(embed)
    }
