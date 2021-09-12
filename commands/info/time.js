let Discord = require('discord.js')
const moment = require('moment');

module.exports = {
name: 'time',
description: "shows current time DD/MM/YY, hh:mm::ss",
run: async (client, message, args) => {
const handleTime = (timestamp) => moment(timestamp).format("DD/MM/YYYY, hh:mm:ss a"); 

let timeEmbed = new Discord.MessageEmbed()
.setTitle("Current Time")
.setDescription(`${handleTime(new Date())}`)
.setColor("RANDOM")
.setFooter(
    `Requested by ${message.author.tag}`,
    message.author.displayAvatarURL({ dynamic: true })
  )
message.channel.send(timeEmbed)
}
}