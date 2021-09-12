const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'punch',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const target = message.mentions.users.first () || message.guild.members.cache.get(args[0]);
        if (!target) {
             return message.channel.send("Please Mention a member to punch, your punching yourself lmao?")
    }
        const punches = [
            'https://i.giphy.com/media/iWEIxgPiAq58c/giphy.gif',
            'https://i.giphy.com/media/DViGV8rfVjw6Q/giphy.gif',
            'https://i.giphy.com/media/GoN89WuFFqb2U/giphy.gif',
            'https://i.giphy.com/media/xT0BKiwgIPGShJNi0g/giphy.gif',
            'https://i.pinimg.com/originals/50/7b/d1/507bd16df309b4fd7b5893fc3930f2de.gif',
            'https://media1.tenor.com/images/df8af24e5756ecf4a4e8af0c9ea6499b/tenor.gif?itemid=4902917',
            'https://i.giphy.com/media/Lx8lyPHGfdNjq/giphy.gif'
        ];
        const punchEmbed = new MessageEmbed()
        .setTitle("OUCHH!!!")
        .setDescription(`${message.author.tag} punched ${target.username}`)
        .setImage(punches[Math.floor(Math.random() * punches.length)])
        .setColor("RANDOM")
        .setTimestamp()
        message.channel.send(punchEmbed)
    }
}