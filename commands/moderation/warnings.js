const Discord = require('discord.js');
const db = require('quick.db');

    
module.exports = {
    name: "warnings",
    description: "Check a users warnings",

    async run (client, message, args){
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;


        let warnings = await db.get(`warnings_${message.guild.id}_${user.id}`);
        


        let reason = require('../moderation/warn') 
        if(warnings === null) warnings = 0;
        
        
        db.get(`reason_${message.guild.id}_${user.id}`, reason);
        message.channel.send(`**${user.username}** has *${warnings}* warning the reasons are ${reason}`);

        
    }
}