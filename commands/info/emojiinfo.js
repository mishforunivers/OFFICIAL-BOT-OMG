const { Client, Message, MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'emojiinfo',
    aliases: ['emoinfo'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const { guild } = message;
        let { Emoji, Util } = require("discord.js");
        let emoji = new Emoji(client, Util.parseEmoji(args[0])),

  target = client.emojis.cache.get(emoji.id) || emoji,
  asset =
    target.url ||
    `https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/${decodeURIComponent(
      target.identifier
    )
      .charCodeAt(0)
      .toString(16)}.png`;
let embed = new MessageEmbed().setTitle('Emoji Info!').setColor("RANDOM").setThumbnail(asset).setTimestamp().addFields(
  {
    name: "ID",
    value: target.id,
    inline: true
  },
  {
    name: "Name",
    value: target.name,
    inline: true
  },
  {
    name: "Image url",
    value: asset,
    inline: true
  },
  {
    name: "Deletable",
    value: target.deletable ? "Yes" : "No",
    inline: true
  },
  {
    name: "Requires Colons",
    value: target.requireColons ? "Yes" : "No",
    inline: true
  },
  {
    name: "Animated",
    value: target.animated ? "Yes" : "No",
    inline: true
  },
  {
      name: "Created at",
      value: `${moment(emoji.createdTimestamp).format(
        "LT"
    )} ${moment(emoji.createdTimestamp).format("LL")} ${moment(
        emoji.createdTimestamp
    ).fromNow()}`,
    inline: true
  }
);
message.channel.send(embed);
    }
}