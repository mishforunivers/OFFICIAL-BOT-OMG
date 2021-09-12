const {MessageEmbed} = require('discord.js')
module.exports=async(channelDelete)=>{ 
        const embed = new MessageEmbed()
        .setTitle('Channel Deleted')
        .setDescription(`A channel has been deleted!\nChannel: **${channelDelete.name}**`)
        .setColor("RANDOM")
        .setTimestamp()

    let channel = channelDelete.guild.channels.cache.find(ch=>ch.name==="🔗・logs・univers")
    if(!channel) return;
        channel.send(embed)
    }