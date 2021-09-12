const Discord = require('discord.js');

module.exports = {
    name: "announce",
    category: "Moderation",
    aliases: ["announcement", "broadcast"],
    description: "Announce a embedded message",
    run: async(client, message, args) => {

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You can\'t use that!')
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('I don\'t have the right permissions.')

        message.delete();
        let split = '|';

        if(!args[0]) {

            const invalid = new Discord.MessageEmbed()
            .setAuthor("Announce", client.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 }))
            .setColor("#eb0936")
            .setTitle("Invalid Argument")
            .setDescription("**USAGE**\n`announce <embedTitle>|<embedMessage>|<embedColor>|<embedThubmnail>|<embedImage>`\n\n**FOR MORE HELP**\n`helpannounce`")
            
            return message.channel.send({embed: invalid})
        }

        args = args.join(' ').split(split)

        for (var i = 0; i < args.length; i++) args[i].trim();

        if (args[5]) args[5] = parseInt(`0x${args[5]}`);    

        let options = {
            title: args[0] ,
            message: args[1] || 'Undefined',
            embedColor: args[2] || 0xffffff,
            thumbnail: args[3],
            image: args[4]
            
          


        }

        const embed =  new Discord.MessageEmbed()
            .setColor(options.embedColor)
            .setTitle(options.title)
            .setThumbnail(options.thumbnail)
            .setImage(options.image)
            
            
            
            if (options.message) embed.setDescription(options.message);
            

           message.channel.send(embed)



    }
}