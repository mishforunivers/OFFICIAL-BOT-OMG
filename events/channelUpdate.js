const {MessageEmbed} = require('discord.js')
module.exports=async(oldChannel,newChannel)=>{ 
    let newCat = newChannel.parent ? newChannel.parent.name : "NO PARENT";
    let guildChannel = newChannel.guild;
    if(!guildChannel || !guildChannel.available) return;

    let types = {
        text: "Text Channel",
        voice: "Voice Channel",
        null: "No Type",
        news: "News Channel",
        store: "Store Channel",
        category: "Category",
      }

        const embed = new MessageEmbed()
        .setTitle(' Channel Name Changed!')
        .setDescription(`Old name: \`${oldChannel.name}\`\nChannelID: \`${oldChannel.id}\`\n\n`+ `New Name: \`${newChannel.name}\`\nChannelID: \`${newChannel.id}\``)
        .setColor("RANDOM")
        .setTimestamp()

    let channel = oldChannel.guild.channels.cache.find(ch=>ch.name==="🔗・logs・univers")
    if(!channel) return;
        channel.send(embed)
    }
    
  module.exports=async(oldChannel,newChannel)=>{ 

          const embed = new MessageEmbed()
          .setTitle(' Channel Topic Changed!')
          .setDescription( `Old Channel \`${oldChannel.name}\`\nChannel ID: \`${oldChannel.id}\`\nOld Channel Topic: \`${oldChannel.topic}\`\n\n`+ `\`${newChannel.name}\`\nChannel ID: \`${newChannel.id}\`\nNewChannel Topic: \`${newChannel.topic}\``)
          .setColor("RANDOM")
          .setTimestamp()
  
      let channel = oldChannel.guild.channels.cache.find(ch=>ch.name==="🔗・logs・univers")
      if(!channel) return;
          channel.send(embed)
    }
    