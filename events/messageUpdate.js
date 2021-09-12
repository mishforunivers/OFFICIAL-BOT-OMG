const {MessageEmbed} = require('discord.js')
module.exports=async(oldMessage,newMessage)=>{
    let embed = new MessageEmbed()
    .setTitle('New message edited')
    .setColor("RANDOM")
    .setDescription(`**${oldMessage.author.tag}** has edited a message in <#${oldMessage.channel.id}>`)
    .addField(`Before Edit`,oldMessage.content,true)
    .addField(`After Edit`,newMessage.content,true)
    .setTimestamp()
    .setThumbnail(`${oldMessage.author.displayAvatarURL({ dynamic: true})}`)
    let channel = oldMessage.guild.channels.cache.find(ch=>ch.name ==="🔗・logs・univers")
    if(!channel) return;
    channel.send(embed)
}