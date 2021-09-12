const {MessageEmbed} = require('discord.js')
module.exports=async(oldEmoji,newEmoji)=>{ 
        const embed = new MessageEmbed()
        .setTitle(' Emoji Name changed')
        .setDescription(`Emoji: ${newEmoji} \n\n**Before:** \`${oldEmoji.name}\`\n**After:** \`${newEmoji.name}\`\n**Emoji ID:** \`${newEmoji.id}\``)
        .setColor("RANDOM")
        .setTimestamp()

    let channel = oldEmoji.guild.channels.cache.find(ch=>ch.name==="🔗・logs・univers")
    if(!channel) return;
        channel.send(embed)
    }