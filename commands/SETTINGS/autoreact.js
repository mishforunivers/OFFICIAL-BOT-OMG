const db = require("quick.db");
const Discord = require("discord.js")
const  { Emoji, Util } = require("discord.js");

module.exports = {
  name: "autoreact",
  aliases: ["setautoreact", "auto-react"],
  run: async(client, message, args) => {
     if (message.member.hasPermission("MANAGE_SERVER")) {
    
if(!args[0])
{
  return message.channel.send(new Discord.MessageEmbed()
  .setTitle("Missing Arguement")
  .setDescription("<a:No:876198779798310952> Specify a Message for autoreact! EXAMPLE: -- \n`--autoreact <MESSAGE> <EMOJI>` -- Enables autoreact\n`--autoreact disable` -- Disables autoreact")
  .setColor("RED")
  .setTimestamp()
  );
}
  var Message1 = args[1]
    if(!Message1) return message.channel.send(new Discord.MessageEmbed()
  .setTitle("Missing Arguement")
  .setDescription("<a:No:876198779798310952> Specify a Message for autoreact! EXAMPLE: -- \n`--autoreact <MESSAGE> <EMOJI>` -- Enables autoreact\n`--autoreact disable` -- Disables autoreact")
  .setColor("RED")
  .setTimestamp()
    )
    let emoji = Discord.Util.parseEmoji(args[2]);
    if (!emoji) return message.channel.send(new Discord.MessageEmbed()
  .setTitle("Missing Arguement")
  .setDescription("<a:No:876198779798310952> Specify an Emoji for autoreact! EXAMPLE: -- \n`--autoreact <MESSAGE> <EMOJI>` -- Enables autoreact\n`--autoreact disable` -- Disables autoreact")
  .setColor("RED")
  .setTimestamp()
    )
if(args[0] == "disable" || args[0] == "off")
{
 
  db.delete(`autoreact_${message.guild.id}`);
  return message.channel.send(new Discord.MessageEmbed()
  .setTitle("Done!")
  .setDescription(`<a:Yess:876198935939657750> Updated Settings! -- autoreact is now Disabled!  Old autoreact was: Message: **${Message1}** -- Emoji: ${emoji}`)
  .setColor("GREEN")
  .setTimestamp()
  );
} else {
message.channel.send(new Discord.MessageEmbed()
.setTitle("Done!")
.setDescription(`<a:Yess:876198935939657750> Updated Settings! -- autoreact is now on -- Message: **${Message1}** -- Emoji: ${emoji}`)
.setColor("GREEN")
.setTimestamp())
db.set(`autoreact_${message.guild.id}`, Message1,emoji);
}
     }
  }
}