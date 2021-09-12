const db = require("quick.db");
const Discord = require("discord.js");
module.exports = {
  name: "autonick",
  aliases: ["auto-nick"],
  run: async(client, message, args) => {
      if (!message.member.hasPermission("MANAGE_GUILD"))
    {
       message.channel.send(
        "You need `MANAGE GUILD` to configure the auto nick settings!"
      );
      return;
}
if(!args[0]){
  return message.channel.send(new Discord.MessageEmbed()
  .setTitle("Missing Arguement")
  .setDescription("<a:No:876198779798310952> Specify a nickname for autonick! EXAMPLE: -- \n`--autonick <NICKNAME>` -- Enables Autonick\n`--autonick disable` -- Disables Autonick")
  .setColor("RED")
  .setTimestamp()
  )
}
    let message1 = args.join(" ");
    if(message1 !== "disable")
{
  db.set(`nickm_${message.guild.id}`, message1);
  message.channel.send(new Discord.MessageEmbed()
  .setTitle("Done!")
 .setDescription(`<a:Yess:876198935939657750> Updated Settings! -- AutoNick is now -- **${message1}**`)
 .setColor("GREEN")
 .setTimestamp()
  );
}
if(args[0] == "disable" || args[0] == "off")
{
 db.delete(`nickm_${message.guild.id}`);
 return message.channel.send(new Discord.MessageEmbed()
 .setTitle("Done!")
 .setDescription(`<a:Yess:876198935939657750> Updated Settings! -- AutoNick is now Disabled`)
 .setColor("GREEN")
 .setTimestamp()
 );
}

  }}