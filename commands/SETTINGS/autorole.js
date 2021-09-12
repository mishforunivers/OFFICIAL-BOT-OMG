const db = require("quick.db");
const Discord = require("discord.js")
module.exports = {
  name: "autorole",
  aliases: ["ar", "auto-role"],
  run: async(client, message, args) => {
     if (message.member.hasPermission("MANAGE_SERVER")) {
      if (message.content.includes("@everyone")) {
        return message.channel.send("Everyone is already automatically given by discord");
      }
    
if(!args[0])
{
  return message.channel.send(new Discord.MessageEmbed()
  .setTitle("Missing Arguement")
  .setDescription("<a:No:876198779798310952> Specify a Role for Autorole! EXAMPLE: -- \n`--autorole <ROLE_ID> OR <MENTION_ROLE>` -- Enables AutoRole\n`--autorole disable` -- Disables Autorole")
  .setColor("RED")
  .setTimestamp()
  );
}
  var role1 = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || args[0]
    if(!role1) return;
if(args[0] == "disable" || args[0] == "off")
{
 
  db.delete(`autorole_${message.guild.id}`);
  return message.channel.send(new Discord.MessageEmbed()
  .setTitle("Done!")
  .setDescription(`<a:Yess:876198935939657750> Updated Settings! -- AutoRole is now Disabled!  Old AutoRole was: ${role1}`)
  .setColor("GREEN")
  .setTimestamp()
  );
} else {
message.channel.send(new Discord.MessageEmbed()
.setTitle("Done!")
.setDescription(`<a:Yess:876198935939657750> Updated Settings! -- AutoRole is now on -- **${role1}**`)
.setColor("GREEN")
.setTimestamp())
db.set(`autorole_${message.guild.id}`, role1);
}
     }
  }
}