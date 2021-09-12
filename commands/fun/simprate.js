const Discord = require("discord.js")

module.exports = {
name: 'simprate',
description: 'Sends you your Simp rate',
usage: 'Simprate [user]',
usage: 'Simprate',
category: 'Fun',
guildOnly: true,
run: async(client, message, args) => {
const user = message.author;
const taggedUser = message.mentions.users.first();
let Simprate = Math.floor(Math.random() * 101)

if(user) {
let simprateEmbed = new Discord.MessageEmbed()
                .setTitle("Simprate Machine")
                .setColor("#000000")
                .setDescription(`${user.username} is \`${Simprate}%\` Simp! `)
                .setFooter(message.client.user.username, message.client.user.avatarURL())
                .setTimestamp()
message.channel.send(simprateEmbed).catch(e => {
console.log(e)
            });

        } if(taggedUser) {
let argsEmbed = new Discord.MessageEmbed()
                .setTitle("Simprate Machine")
                .setColor("#000000")
                .setDescription(`${taggedUser.username} is \`${Simprate}%\` Simp! `)
                .setFooter(message.client.user.username, message.client.user.avatarURL())
message.channel.send(argsEmbed).catch(e => {
console.log(e)
            })
        }
    }
}