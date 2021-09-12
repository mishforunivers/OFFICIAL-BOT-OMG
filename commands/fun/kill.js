const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kill',
    description: "Kills someone",
    usage: "--kill <member mention or id>",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let victim = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if(!victim) message.reply("Mention someone to Kill")
        else{
       let replies = [ (`${victim} has been shot`), (`${victim} has been stabbed`), (`${victim} has been drowned`), 
        (`${victim} has been electrified`), (`A goose honked at ${victim} to death`), 
        (`Some psychopath zapped ${victim} with his laser eyes`), 
        (`${victim} ate a poisonous potato`), (`${victim} died from slowmode being to long`), 
        (`${victim} was run over by car`), (`${victim} was pushed in lava`), (`${victim} was banned by the server owner`), 
        (`${victim} was found dead in a dumpster`), 
        (`Someone named Joe was found chewing on ${victim}'s leg`), (`${victim} got drunk and fell in the water`), 
        (`${victim} made a deal with the devil`), (`${victim} was hacked by an 
       Oreo`), (`An alien named MEE6 abducted ${victim} in their sleep`),]
       
        message.channel.send(`${replies[Math.floor(Math.random() * replies.length)]}`) 
        }
        
    }
}