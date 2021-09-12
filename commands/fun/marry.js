const Discord = require('discord.js')

module.exports = {
    name: "marry",
    description: "marry with any mentioned user",
    aliases: [],
    run: async(client, message, args) => {

        let user = message.mentions.members.first()

        if(!user) return message.channel.send('Please mention a user to marry')
        if(user === message.author) return message.channel.send('Please mention someone and not yourself')

        const Embed = new Discord.MessageEmbed()
        .setTitle('Marry!')
        .setDescription(`You and ${user} are married now <:love:834375769022398514>.`)
        .setColor("RANDOM")
        .setImage("https://uploads.disquscdn.com/images/c61283e79367f4aac1531d8b333bc8b2d11072d6eb1f3fca20707ddd7fdd6fc8.jpg")
        .setTimestamp()

        message.channel.send(Embed)

    }}