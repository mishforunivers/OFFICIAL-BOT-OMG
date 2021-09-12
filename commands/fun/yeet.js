const Discord = require('discord.js');

module.exports = {
    name: "yeet",
    description: "yeet a user",
    usage: `-yeet (@user)`,
    aliases: [],

    run: async(client, message, args) => {
        yeetLinks = [ 'https://media.tenor.com/images/e04568f1ce59a1cc453e42956521c596/tenor.gif',
        'https://media.tenor.com/images/664f3fcda641ca46d76203f74b2478f4/tenor.gif',
        'https://www.icegif.com/wp-content/uploads/reading-icegif-5.gif',
        'https://media1.tenor.com/images/01b11fc630fccfe82dad009ea1e25c28/tenor.gif?itemid=16743813']
        
        const randomNum = Math.floor(Math.random() * Math.floor(yeetLinks.length))
        let member = message.mentions.members.first();

        if(member){
            var firstEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${message.author.username} Yeeted ${member.displayName} !`)
                .setTimestamp()
                .setImage(yeetLinks[randomNum])
            message.channel.send(firstEmbed);
        }else{
            var firstEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Yeeted ${message.author.username}!`)
                .setTimestamp()
                .setImage(yeetLinks[randomNum])
            message.channel.send(firstEmbed);

        }
        
    }
}