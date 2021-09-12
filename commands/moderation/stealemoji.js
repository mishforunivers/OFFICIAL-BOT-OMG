const { Client, Message, Util } = require("discord.js");

module.exports = {
  name: "stealemoji",
    aliases: ['steale'],
  run: async (client, message, args ) => {
    if (!args.length) return message.channel.send(`Please provide some emojis!`)
  if (!message.member.hasPermission("MANAGE_EMOJIS")) return message.channel.send("you do not have permission to use this command!")

    for (const rawEmoji of args) {
    const parsedEmoji = Util.parseEmoji(rawEmoji);

    if (parsedEmoji.id) {
      const extension = parsedEmoji.animated ? ".gif" : ".png";
      const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
      message.guild.emojis
      .create(url, parsedEmoji.name)
      .then((emoji) => message.channel.send(`Added: \`${emoji.url}\``))
    }

  }
}
}