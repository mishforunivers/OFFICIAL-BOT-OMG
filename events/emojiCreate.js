const {MessageEmbed} = require('discord.js')
module.exports=async(emojiCreate)=>{ 
        const embed = new MessageEmbed()
        .setTitle('New Emoji Created')
        .setDescription(`A new emoji has been created!\nEmoji: ${emojiCreate}`)
        .setColor("RANDOM")
        .setTimestamp()

    let channel = emojiCreate.guild.channels.cache.find(ch=>ch.name==="🔗・logs・univers")
    if(!channel) return;
        channel.send(embed)
    }