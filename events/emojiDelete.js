const {MessageEmbed} = require('discord.js')
module.exports=async(emojiDelete)=>{ 
        const embed = new MessageEmbed()
        .setTitle(' Emoji Deleted')
        .setDescription(`an emoji has been deleted!\nEmoji name: **${emojiDelete.name}**`)
        .setColor("RANDOM")
        .setTimestamp()

    let channel = emojiDelete.guild.channels.cache.find(ch=>ch.name==="🔗・logs・univers")
    if(!channel) return;
        channel.send(embed)
    }