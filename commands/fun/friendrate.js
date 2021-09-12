const Discord = require("discord.js")

module.exports = {
name: 'friendrate',
description: 'Sends you your friendly rate',
category: 'Fun',
guildOnly: true,
run: async(client, message, args) => {
const user = message.author;
const taggedUser = message.mentions.users.first();
let Friend = Math.floor(Math.random() * 101)

if(user) {
let FriendEmbed = new Discord.MessageEmbed()
                .setTitle("Friend Machine")
                .setColor("#000000")
                .setDescription(`${user.username} is \`${Friend}%\` Friendly`)
                .setFooter(message.client.user.username, message.client.user.avatarURL())
                .setTimestamp()
message.channel.send(FriendEmbed).catch(e => {
console.log(e)
            });

        } if(taggedUser) {
let argsEmbed = new Discord.MessageEmbed()
                .setTitle("Friend Machine")
                .setColor("#000000")
                .setDescription(`${taggedUser.username} is \`${Friend}%\` Friendly`)
                .setFooter(message.client.user.username, message.client.user.avatarURL())
message.channel.send(argsEmbed).catch(e => {
console.log(e)
            })
        }
    }
}