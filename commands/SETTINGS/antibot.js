const db = require("quick.db");
const Discord = require("discord.js")
module.exports = {
  name: "antibot",
  aliases: ["anti-bot"],
  run: async(client, message, args) => {
     let embed = db.fetch(`embed_${message.guild.id}`);
    
    if (!message.member.hasPermission("MANAGE_GUILD"))
    {
       message.channel.send(
        "You need `MANAGE GUILD` to configure the anti bot settings!"
      );
      return;
}
    let content = args[0];
  
    
      if(!content)
    {
        return message.channel.send(new Discord.MessageEmbed()
      .setTitle("Missing Arguement")
      .setDescription("<a:No:876198779798310952> Specify an Option for antibot! EXAMPLE: -- \n`--antibot on ` -- Enables antibot\n`--antibot off` -- Disables antibot\n`--antibot check` -- Checks antibot status")
      .setColor("RED")
      .setTimestamp()
      )
    }
    if (content.toLowerCase() === "on") 
    {
       let antibot1 = db.fetch(`antibot_${message.guild.id}`);
      if(antibot1 == "on")
      {
        message.channel.send(new Discord.MessageEmbed()
        .setTitle("Uh Oh!")
        .setDescription("<a:No:876198779798310952> antibot Is already turned on! To Disable, Use: -- \n`--antibot off` -- Disables antibot")
        .setColor("RED")
        .setTimestamp()
        )
        return;
      }
      let on1 = "on";
      db.set(`antibot_${message.guild.id}`, on1);
      message.channel.send(new Discord.MessageEmbed()
      .setTitle("Done!")
      .setDescription(`<a:Yess:876198935939657750> Updated Settings! -- antibot is now Enabled!  `)
      .setColor("GREEN")
      .setTimestamp());
    }
     else if (content.toLowerCase() === "off") 
    {
        let antibot1 = db.fetch(`antibot_${message.guild.id}`);
      if(antibot1 == "off")
      {
        message.channel.send(new Discord.MessageEmbed()
        .setTitle("Uh Oh!")
        .setDescription("<a:No:876198779798310952> antibot Is already turned off! To Enable, Use: -- \n`--antibot on` -- Enables antibot")
        .setColor("RED")
        .setTimestamp()
        );
        return;
      }
      let off1 = "off";
      db.set(`antibot_${message.guild.id}`, off1);
      message.channel.send(new Discord.MessageEmbed()
      .setTitle("Done!")
      .setDescription(`<a:Yess:876198935939657750> Updated Settings! -- antibot is now Disabled!`)
      .setColor("GREEN")
      .setTimestamp()
      );
    }
    else if (content.toLowerCase() === "check") {
      let antibot1 = db.fetch(`antibot_${message.guild.id}`);
      if(antibot1 == "on") {
        return message.channel.send(new Discord.MessageEmbed()
        .setTitle("Anti-bot Check")
        .setDescription("<a:Yess:876198935939657750>  antibot is currently enabled! To Disable, Use: -- \n`--antibot off` -- Disables antibot")
        .setColor("GREEN")
        .setTimestamp()
        );
      } else {
        if(antibot1 == "off") {
            return message.channel.send(new Discord.MessageEmbed()
        .setTitle("Anti-bot Check")
        .setDescription("<a:Yess:876198935939657750>  antibot is currently Disabled! To Enable, Use: -- \n`--antibot on` -- Enables antibot")
        .setColor("GREEN")
        .setTimestamp()
        );
        } else {
            return message.channel.send(new Discord.MessageEmbed()
            .setTitle("Missing Arguement")
            .setDescription("<a:No:876198779798310952> Specify an Option for antibot! EXAMPLE: -- \n`--antibot on ` -- Enables antibot\n`--antibot off` -- Disables antibot\n`--antibot check` -- Checks antibot status")
            .setColor("RED")
            .setTimestamp()
            )
        }
      }
    }
    }
}