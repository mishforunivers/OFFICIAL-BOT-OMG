const Discord = require('discord.js')

module.exports = {
    name: "liedetector",
    aliases: ["detector"],
    description: "lie detector lets see if your not liar",

    async run (bot, message, args) {
        if(!args[0]) return message.reply('Please ask a full ask')
        let replies = ["That True", "Its lie", "Definitely Truth", "Why you always lying ", "Your not lying", "Big Liarr!!!!!.", "Better tell me truth now.", "Thank you for not lying to me", "Good boi", "I can trust you", "Your not trusted get out!"];
        
        let result = Math.floor((Math.random() * replies.length));
        let question = args.slice().join(" ");

        let ballembed = new Discord.MessageEmbed()
        .setTitle("LIE DETECTOR")
        .setColor("RANDOM")
        .addField("Answer", question)
        .addField("Lie Detector", replies[result])
        .setTimestamp()
        .setFooter(`${message.author.username}`)

        message.channel.send(ballembed)
    }
}