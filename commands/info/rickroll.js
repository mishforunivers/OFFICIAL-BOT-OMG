const {
    Client,
    Message,
    MessageEmbed,
    MessageAttachment,
  } = require("discord.js");
  
  module.exports = {
    name: "rickroll",
    aliases: ["rick", "nevergonnagiveyouup", "never"],
    description: "Rickroll?",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
      const roll = [
        "Never gonna give you up",
        "Never gonna let you down",
        "Never gonna run around and desert you",
        "Never gonna make you cry",
        "Never gonna say goodbye",
        "Never gonna tell a lie and hurt you",
      ];
      const rick = roll[Math.floor(Math.random() * roll.length)];
      const rickroll = new MessageAttachment(
        "https://i.pinimg.com/originals/88/82/bc/8882bcf327896ab79fb97e85ae63a002.gif"
      );
      message.reply(`**${rick}**`, {
        files: [rickroll],
      });
    },
  };