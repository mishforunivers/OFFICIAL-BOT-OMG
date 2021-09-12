const db = require("quick.db");
const Discord = require("discord.js");
module.exports = {
  name: "auto-officialrole",
  aliases: ["auto-official", "auto-name-role","anr","autoofficial"],
  run: async(client, message, args) => {
     if (!message.member.hasPermission("MANAGE_SERVER")) {
       return;
     }
if(!args[0])
{
  return message.channel.send(new Discord.MessageEmbed()
  .setTitle("Missing Arguement")
  .setDescription("<a:No:876198779798310952> Specify an Option for Auto Official role! EXAMPLE: -- \n`--auto-officialrole role ` -- Autorole when someone add your given tag to his username\n`--auto-officialrole name` -- Autorole when someone add this name to his/her username\n`--antilink check` -- Checks antilink status")
  .setColor("RED")
  .setTimestamp());
}
if(args[0] == "role")
{
  var role2 = message.mentions.roles.first();
  if(role2)
  {
    var role2 = message.guild.roles.cache.get(args[1]) || args[1]
  }
  else if(!role2){
    var role2 = args[1];
  }
  if(!role2){
    return message.channel.send(new Discord.MessageEmbed()
    .setTitle("Missing Arguement")
    .setDescription("<a:No:876198779798310952> Specify a Role for Auto-officialrole ! EXAMPLE: -- \n`--auto-officialrole role <ROLE_ID> OR <MENTION_ROLE>` -- Autorole when someone add your given tag to his username\n`--auto-officialrole name` -- Autorole when someone add this name to his/her username\n`--auto-officialrole name` -- Autorole when someone add this name to his/her")
    .setColor("RED")
    .setTimestamp());
  }
  db.set(`tagg_${message.guild.id}`, role2);
  return message.channel.send(new Discord.MessageEmbed()
  .setTitle("Done!")
  .setDescription("<a:Yess:876198935939657750> Updated Settings! -- Auto-officialrole is now Enabled [ROLE]!  Autorole when someone add your given tag to his username! to setuo tag use -- \n`----auto-officialrole name [TAG FOR AUTOROLE]`")
  .setColor("GREEN")
  .setTimestamp());
}
if(args[0] == "name")
{
 let name = args[1]; 
 if(!name)
 {
   return message.channel.send(new Discord.MessageEmbed()
   .setTitle("Missing Arguement")
   .setDescription("<a:No:876198779798310952> Specify a Tag for Auto-officialrole ! EXAMPLE: -- \n`--auto-officialrole name` -- Autorole when someone add this name to his/her")
   .setColor("RED")
   .setTimestamp());
 }
 db.set(`tagn_${message.guild.id}`, name);
 return message.channel.send(new Discord.MessageEmbed()
 .setTitle("Done!")
 .setDescription("<a:Yess:876198935939657750> Updated Settings! -- Auto-officialrole is now Enabled [TAG]!  Autorole when someone add this name to his/her username! to setuo tag use `")
 .setColor("GREEN")
 .setTimestamp());
}
  }
}