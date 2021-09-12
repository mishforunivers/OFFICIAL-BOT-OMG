const Discord = require("discord.js")

module.exports = {
name: 'susrate',
description: 'Sends you your sus rate',
usage: 'susrate [user]',
usage: 'susrate',
category: 'Fun',
guildOnly: true,
run: async(client, message, args) => {
const user = message.author;
const taggedUser = message.mentions.users.first();
let susrate = Math.floor(Math.random() * 101)

if(user) {
let susrateEmbed = new Discord.MessageEmbed()
                .setTitle("Susrate Machine")
                .setColor("#000000")
                .setDescription(`${user.username} is \`${susrate}%\` Sus <:sus:872039116332728330>`)
                .setFooter(message.client.user.username, message.client.user.avatarURL())
                .setTimestamp()
message.channel.send(susrateEmbed).catch(e => {
console.log(e)
            });

        } if(taggedUser) {
let argsEmbed = new Discord.MessageEmbed()
                .setTitle("susrate Machine")
                .setColor("#000000")
                .setDescription(`${taggedUser.username} is \`${susrate}%\` Sus! <:sus:872039116332728330>`)
                .setFooter(message.client.user.username, message.client.user.avatarURL())
message.channel.send(argsEmbed).catch(e => {
console.log(e)
            })
        }
    }
}