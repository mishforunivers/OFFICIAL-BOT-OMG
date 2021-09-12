const { Message } = require("discord.js");
const Discord = require("discord.js")
module.exports = {
  name: 'nuke',
  description: "Deletes channel and clones new one",
  /**
   * @param {*} client
   * @param {Message} message
   * @param {*} args
   */
  run : async(client, message, args) => {
      if(!message.member.hasPermission('MANAGE_CHANNELS')) return;
      if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.reply('I need manage channels permission to do that')
      const image = "https://media.giphy.com/media/g97l3TDHfBdAH2dcny/giphy.gif"
      const newCh = await message.channel.clone();
      const position = message.channel.position;
      await message.channel.delete();
			newCh.setPosition(position);
          
          newCh.send(new Discord.MessageEmbed()
          .setTitle(`**${message.author.tag}** Nuked ${message.channel.name}`)
          .setImage(image)
          .setColor("PURPLE")
          .setFooter("Univers Official Bot")
          .setTimestamp()
          )
      }
    }
    //https://i.pinimg.com/originals/ce/2b/78/ce2b78a05838ef311c0868bb2fca0494.gif