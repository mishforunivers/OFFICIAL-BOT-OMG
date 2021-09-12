const {MessageEmbed} = require('discord.js')
module.exports=async(channelCreate)=>{ 
        const embed = new MessageEmbed()
        .setTitle('New Channel Created')
        .setDescription(`A new channel has been created!\nChannel: ${channelCreate}`)
        .setColor("RANDOM")
        .setTimestamp()

    let channel = channelCreate.guild.channels.cache.find(ch=>ch.name==="🔗・logs・univers")
    if(!channel) return;
        channel.send(embed)
    }