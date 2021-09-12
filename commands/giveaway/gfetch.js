const ms = require('ms');
const Discord = require("discord.js");
module.exports = {
  name: "g-fetch",
  aliases: ["gfetch", "gf"],
  run: async(client, message, args) => {

    let giveaways = []
    const giveaways1 = client.giveawaysManager.giveaways.filter((g) => g.guildID === message.guild.id)
    const giveaways2 = giveaways1.filter((g) => !g.ended)
    const giveaways3 = giveaways2.forEach((thisGiveaway)=>{
        let winners = ''
        if(thisGiveaway.winnerCount == 1){
            winners = 'winner'
        }else{
            winners = 'winners'
        }
        giveaways.push(`\`${thisGiveaway.messageID}\` | <#${thisGiveaway.channelID}> | **${thisGiveaway.winnerCount}** ${winners} | Prize: **${thisGiveaway.prize}** | [Giveaway Link](https://discord.com/channels/${message.guild.id}/${thisGiveaway.channelID}/${thisGiveaway.messageID})`)
    })
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle('Current Giveaways')
    .setDescription(giveaways.join('\n') || 'No giveaways are currently running')
    message.channel.send(embed)
    }
    }