const { Client, Message, MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const gifSearch = require("gif-search");
module.exports = {
    name: 'gif',
    description: "searches gif by word!",
    premium: true,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

  if (message.author.bot) return;
  if (message.channel.type == "dm") return;
  if(args[0] == "help"){
    message.channel.send("```"+"Description: search for a gif \nUsage: --gif hello"+"```")
    return;
  }

    if (!args[0]) return message.channel.send("--gif [search term]");

    gifSearch.random(args[0]).then(
        gifUrl => {
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage(gifUrl)
        message.channel.send(embed);
    });
}

    }
