const db = require("quick.db");
const Discord = require("discord.js")
module.exports = {
  name: "autowebhookdel",
  aliases: ["auto-webhookdel"],
  run: async(client, message, args) => {
     let embed = db.fetch(`embed_${message.guild.id}`);
    
    if (!message.member.hasPermission("MANAGE_GUILD"))
    {
       message.channel.send(
        "You need `MANAGE GUILD` to configure the AutoWebhookdel settings!"
      );
      return;
}
    let content = args[0];
  
    
      if(!content)
    {
        return message.channel.send(new Discord.MessageEmbed()
      .setTitle("Missing Arguement")
      .setDescription("<a:No:876198779798310952> Specify an Option for AutoWebhook! EXAMPLE: -- \n`--AutoWebhook on ` -- Enables Auto Webhook delete feature\n`--AutoWebhook off` -- Disables Auto Webhook delete feature")
      .setColor("RED")
      .setTimestamp()
      )
    }
    if (content.toLowerCase() === "on") 
    {
        
       let AutoWebhook1 = db.fetch(`AutoWebhook_${message.guild.id}`);
      if(AutoWebhook1 == "on")
      {
        message.channel.send(new Discord.MessageEmbed()
        .setTitle("Uh Oh!")
        .setDescription("<a:No:876198779798310952> AutoWebhook Is already turned on! To Disable, Use: -- \n`--AutoWebhook off` -- Disables Auto Webhook delete feature")
        .setColor("RED")
        .setTimestamp()
        )
        return;
      }
      let amount1 = args[0]
      let on1 = "on";
      db.set(`AutoWebhook_${message.guild.id}`, on1, amount1);
      message.channel.send(new Discord.MessageEmbed()
      .setTitle("Done!")
      .setDescription(`<a:Yess:876198935939657750> Updated Settings! -- AutoWebhook is now Enabled!  `)
      .setColor("GREEN")
      .setTimestamp());
    }
     else if (content.toLowerCase() === "off") 
    {
        let AutoWebhook1 = db.fetch(`AutoWebhook_${message.guild.id}`);
      if(AutoWebhook1 == "off")
      {
        message.channel.send(new Discord.MessageEmbed()
        .setTitle("Uh Oh!")
        .setDescription("<a:No:876198779798310952> AutoWebhook Is already turned off! To Enable, Use: -- \n`--AutoWebhook on` -- Enables Auto Webhook delete feature")
        .setColor("RED")
        .setTimestamp()
        );
        return;
      }
      let amount2 = args[1]
      let off1 = "off";
      db.set(`AutoWebhook_${message.guild.id}`, off1, amount2);
      message.channel.send(new Discord.MessageEmbed()
      .setTitle("Done!")
      .setDescription(`<a:Yess:876198935939657750> Updated Settings! -- AutoWebhook is now Disabled!`)
      .setColor("GREEN")
      .setTimestamp()
      );
    } else if (content.toLowerCase() === "check") {
      let AutoWebhookdel1 = db.fetch(`AutoWebhookdel_${message.guild.id}`);
      if(AutoWebhookdel1 == "on") {
        return message.channel.send(new Discord.MessageEmbed()
        .setTitle("Anti-Link Check")
        .setDescription("<a:Yess:876198935939657750>  AutoWebhookdel is currently enabled! To Disable, Use: -- \n`--AutoWebhookdel off` -- Disables Auto Webhook delete feature")
        .setColor("GREEN")
        .setTimestamp()
        );
      } else {
        if(AutoWebhookdel1 == "off") {
            return message.channel.send(new Discord.MessageEmbed()
        .setTitle("Anti-Link Check")
        .setDescription("<a:Yess:876198935939657750>  AutoWebhookdel is currently Disabled! To Enable, Use: -- \n`--AutoWebhookdel on` -- Enables Auto Webhook delete feature")
        .setColor("GREEN")
        .setTimestamp()
        );
        } else {
            return message.channel.send(new Discord.MessageEmbed()
            .setTitle("Missing Arguement")
            .setDescription("<a:No:876198779798310952> Specify an Option for AutoWebhookdel! EXAMPLE: -- \n`--AutoWebhookdel on ` -- Enables Auto Webhook delete feature\n`--AutoWebhookdel off` -- Disables Auto Webhook delete feature\n`--AutoWebhookdel check` -- Checks Auto Webhook delete feature status")
            .setColor("RED")
            .setTimestamp()
            )
        }
      }
    }
  }
}
    