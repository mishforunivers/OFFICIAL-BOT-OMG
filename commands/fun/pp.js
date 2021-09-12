let Discord = require('discord.js');

module.exports = {
  name: "pp",
  aliases: ["penis"],
  usage: "pp",
  description: "pp with embed",
  run: async (client, message, args) => {
  
 let user = message.mentions.users.first()
 if(!user) user = message.author
 let replies = [
 "8D",
 "8=D",
 "8==D",
 "8===D",
 "8====D",
 "8=====D",
 "8======D",
 "8=======D",
 "8========D",
 "8=========D",
 "8==========D",
 "8===========D",
 "8============D",
 "8=============D",
 ];

 let random = Math.floor(Math.random() * replies.length);

 let embed = new Discord.MessageEmbed()
 .setTitle(`PP Size Generator`)
 .setDescription(`${user.tag}'s penis\n${replies[random]}`)
 .setColor("RANDOM");

 message.channel.send(embed);
}
}