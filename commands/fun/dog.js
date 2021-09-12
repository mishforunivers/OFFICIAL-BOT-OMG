const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "dog",
  description: "Shows a picture of a dog",
  category: "animal",
  run: async (client, message) => {
    const data = await fetch(
      "https://dog.ceo/api/breeds/image/random"
    ).then((res) => res.json());

    const embed = new MessageEmbed()
    .setTitle("RANDOM DOG PICTURE/GIF")
      .setFooter(message.author.username)
      .setColor("RANDOM")
      .setDescription(
        `[Click here if the image failed to load.](${data.message})`
      )
      .setImage(`${data.message}`)
      .setTimestamp();

    message.channel.send(embed);
  },
};