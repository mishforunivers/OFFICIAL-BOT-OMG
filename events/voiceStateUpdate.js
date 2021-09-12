const {MessageEmbed} = require('discord.js')
module.exports=async(oldMember, newMember) => {

    let oldUserChannel = oldMember.channelId;
    let NewUserChannel = newMember.channelId;

    if (NewUserChannel === "862420837788418078") {

        const voiceChannelLogsEmbed = new MessageEmbed()
            .setTitle("voice channel logs")
            .setDescription(`user ${newMember} joined the channel ${NewUserChannel}`)


            let channel = oldMember.guild.channels.cache.find(ch=>ch.name==="🔗・logs・univers")
            if(!channel) return;
                channel.send(voiceChannelLogsEmbed)
    }
}