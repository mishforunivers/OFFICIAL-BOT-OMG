const client = require("../index.js")
const {MessageEmbed} = require('discord.js')
module.exports=async(message)=>{
    let embed = new MessageEmbed()
    .setTitle('New message deleted!')
    .setDescription(`**${message.author.tag} has deleted a message in <#${message.channel.id}>**`)
    .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true})}`)
    .addField('Content',message.content,true)
    .setTimestamp()
    .setColor("RANDOM")
    let channel = message.guild.channels.cache.find(ch=>ch.name==="🔗・logs・univers")
    if(!channel) return;
    channel.send(embed)
}

