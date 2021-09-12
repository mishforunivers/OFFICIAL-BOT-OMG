const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'hug',
    description: "hugs other people",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const target = message.mentions.users.first () || message.guild.members.cache.get(args[0]);
        if (!target) {
             return message.channel.send("Please Mention a member to hug, your hugging yourself lmao?")
    }
        const hug = [
            'https://media.tenor.com/images/ecf4840ba6fac22be773e586493d5283/tenor.gif',
            'https://www.gifcen.com/wp-content/uploads/2021/03/knockout-gif-19.gif',
            'https://1stnews.com/wp-content/uploads/2019/10/Different-types-of-hugs-reveal-what-your-relationship-is-really-like.gif',
            'https://media.tenor.com/images/693b0731683b7610c69f5594d953dbb2/tenor.gif',
            'https://78.media.tumblr.com/cf804b9dcb8c730adf32da8ec22f5ae8/tumblr_p7lptpPrMv1wruyjbo1_500.gif',
            'https://media.tenor.com/images/88e2723842f66bb2ca8cbe5e0388b828/tenor.gif',
            'https://i2.wp.com/media1.tenor.com/images/0ca4265398dbb1943bc1c769228a4d79/tenor.gif',
            'https://i2.wp.com/s1.favim.com/orig/151010/cute-disney-happy-hugs-Favim.com-3414130.gif',
            'https://i.gifer.com/M1bH.gif',
            'https://media3.giphy.com/media/k6SMGojsRMMpy/giphy.gif',
            'https://media.tenor.com/images/afa711537fddef0e56fa957fc71cbc23/tenor.gif',
            'https://i.pinimg.com/originals/97/b4/61/97b4614345b6323c1790bfcdf87ed42c.gif',
            'https://media1.tenor.com/images/f979769b75c14bd707f6fb1f3f427b9b/tenor.gif?itemid=5566928'
        ];
        const punchEmbed = new MessageEmbed()
        .setTitle("AWWWWWWWWW")
        .setDescription(`${message.author.tag} Hugged! ${target.username}`)
        .setImage(hug[Math.floor(Math.random() * hug.length)])
        .setColor("RANDOM")
        .setTimestamp()
        message.channel.send(punchEmbed)
    }
}