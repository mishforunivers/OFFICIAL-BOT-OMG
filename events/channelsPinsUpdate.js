const {MessageEmbed} = require('discord.js')
module.exports=async(channel,time)=>{ 
        const embed = new MessageEmbed()
        .setTitle('Channel Pins Changed!')
        .setDescription(` \`${channel.name}\`\nChannelID: \`${channel.id}\`\nPinned at \`${time}\``
        , "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/samsung/265/pushpin_1f4cc.png"
      )
        .setColor("RANDOM")
        .setTimestamp()

    let channel1 = channel.guild.channels.cache.find(ch=>ch.name==="🔗・logs・univers")
    if(!channel1) return;
        channel1.send(embed)
    }