const db = require("quick.db");
const Discord = require("discord.js")
module.exports = {
  name: "antilink",
  aliases: ["anti-link"],
  run: async(client, message, args) => {
     let embed = db.fetch(`embed_${message.guild.id}`);
    
    if (!message.member.hasPermission("MANAGE_GUILD"))
    {
       message.channel.send(
        "You need `MANAGE GUILD` to configure the anti link settings!"
      );
      return;
}
    let content = args[0];
  
    
      if(!content)
    {
        return message.channel.send(new Discord.MessageEmbed()
      .setTitle("Missing Arguement")
      .setDescription("<a:No:876198779798310952> Specify an Option for AntiLink! EXAMPLE: -- \n`--antilink on ` -- Enables antilink\n`--antilink off` -- Disables Antilink\n`--antilink check` -- Checks antilink status")
      .setColor("RED")
      .setTimestamp()
      )
    }
    if (content.toLowerCase() === "on") 
    {
       let antilink1 = db.fetch(`antilink_${message.guild.id}`);
      if(antilink1 == "on")
      {
        message.channel.send(new Discord.MessageEmbed()
        .setTitle("Uh Oh!")
        .setDescription("<a:No:876198779798310952> AntiLink Is already turned on! To Disable, Use: -- \n`--antilink off` -- Disables Antilink")
        .setColor("RED")
        .setTimestamp()
        )
        return;
      }
      let on1 = "on";
      db.set(`antilink_${message.guild.id}`, on1);
      message.channel.send(new Discord.MessageEmbed()
      .setTitle("Done!")
      .setDescription(`<a:Yess:876198935939657750> Updated Settings! -- AntiLink is now Enabled!  `)
      .setColor("GREEN")
      .setTimestamp());
    }
     else if (content.toLowerCase() === "off") 
    {
        let antilink1 = db.fetch(`antilink_${message.guild.id}`);
      if(antilink1 == "off")
      {
        message.channel.send(new Discord.MessageEmbed()
        .setTitle("Uh Oh!")
        .setDescription("<a:No:876198779798310952> AntiLink Is already turned off! To Enable, Use: -- \n`--antilink on` -- Enables Antilink")
        .setColor("RED")
        .setTimestamp()
        );
        return;
      }
      let off1 = "off";
      db.set(`antilink_${message.guild.id}`, off1);
      message.channel.send(new Discord.MessageEmbed()
      .setTitle("Done!")
      .setDescription(`<a:Yess:876198935939657750> Updated Settings! -- AntiLink is now Disabled!`)
      .setColor("GREEN")
      .setTimestamp()
      );
    }
    else if (content.toLowerCase() === "check") {
      let antilink1 = db.fetch(`antilink_${message.guild.id}`);
      if(antilink1 == "on") {
        return message.channel.send(new Discord.MessageEmbed()
        .setTitle("Anti-Link Check")
        .setDescription("<a:Yess:876198935939657750>  AntiLink is currently enabled! To Disable, Use: -- \n`--antilink off` -- Disables Antilink")
        .setColor("GREEN")
        .setTimestamp()
        );
      } else {
        if(antilink1 == "off") {
            return message.channel.send(new Discord.MessageEmbed()
        .setTitle("Anti-Link Check")
        .setDescription("<a:Yess:876198935939657750>  AntiLink is currently Disabled! To Enable, Use: -- \n`--antilink on` -- Enables Antilink")
        .setColor("GREEN")
        .setTimestamp()
        );
        } else {
            return message.channel.send(new Discord.MessageEmbed()
            .setTitle("Missing Arguement")
            .setDescription("<a:No:876198779798310952> Specify an Option for AntiLink! EXAMPLE: -- \n`--antilink on ` -- Enables antilink\n`--antilink off` -- Disables Antilink\n`--antilink check` -- Checks antilink status")
            .setColor("RED")
            .setTimestamp()
            )
        }
      }
    }
  }
}
    