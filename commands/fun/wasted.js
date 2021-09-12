const { Client, Message, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const canvacord = require('canvacord')

module.exports = {
    name: 'wasted',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let target = message.mentions.members.first() || message.member;

        let avatar = target.user.displayAvatarURL({dynamic: false, format: "png"})
 let image = await canvacord.Canvas.wasted(avatar);
 let wasted = new Discord.MessageAttachment(image, "wasted.png"); 

message.channel.send(wasted)
.catch(err => {
 if(err) return message.channel.send(' Something went wrong with the `wasted` command, please try again later :x:  ')
 })
}
    }
