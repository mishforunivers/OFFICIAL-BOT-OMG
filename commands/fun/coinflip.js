const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "coinflip",
  aliases: ["cf", "coin", "flip"],
  description: "flips a coin",
 
  run: async (bot, message, args) => {
    const n = Math.floor(Math.random() * 2);
    let result;
    if (n === 1) result = "Heads";
    else result = "Tails";
    const embed = new MessageEmbed()
    .setTitle("Coinflip")
      .setColor("RANDOM")
      .setTimestamp()
      .setDescription(`**${message.member.displayName} Flipped ${result}**!`);
      
    message.channel.send(embed);
  },
};