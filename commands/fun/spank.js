const { Client, Message, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const canvacord = require('canvacord')

module.exports = {
    name: 'spank',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let target = message.mentions.members.first() || message.member;
let avatar = target.user.displayAvatarURL({dynamic: false, format: "png"})
let avatar2 = message.author.displayAvatarURL({ dynamic: false, format: "png"});
 let image = await canvacord.Canvas.spank(avatar2, avatar);
 let spank = new Discord.MessageAttachment(image, "spank.png"); 

message.channel.send(spank)
.catch(err => {
 if(err) return message.channel.send(' Something went wrong with the `spank` command, please try again later :x:  ')
 })
}
    }
