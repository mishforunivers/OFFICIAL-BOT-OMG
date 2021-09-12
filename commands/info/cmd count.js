const {
    MessageEmbed
  } = require("discord.js");
  module.exports = {
    name: "commandcount", //the command name for execution & for helpcmd [OPTIONAL]
    category: "Information", //the command category for helpcmd [OPTIONAL]
    aliases: ["cmdcount", "commandamount", "cmdamount"], //the command aliases for helpcmd [OPTIONAL], //the command cooldown for execution & for helpcmd [OPTIONAL]
    usage: "commandcount", //the command usage for helpcmd [OPTIONAL]
    description: "Shows the Amount of Commands an Categories", //the command description for helpcmd [OPTIONAL]
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    minargs: 0, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
      try {
        message.channel.send(new MessageEmbed()
          .setColor("RANDOM")
          .setFooter("Univers Bot ")
          .setTitle("Command Counter")
          .setDescription(`:gear: **[${client.categories.length}] Categories**`)
          .addField(`:gear: Commands`, `**${client.commands.size} Commands**`)
        );
      } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
          .setColor("red").setFooter("Univers Bot ")
          .setTitle(`<:no:833101993668771842> An error occurred`)
          .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
        );
      }
    }
  }