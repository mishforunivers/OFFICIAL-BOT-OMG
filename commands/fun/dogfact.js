const fetch = require("node-fetch");
const {MessageEmbed} = require('discord.js')

module.exports = {
  name: "dogfact",
  description: "Returns a dog fact",
  run: async (client, message) => {
    const fact = await fetch("http://dog-api.kinduff.com/api/facts?number=1")
      .then((res) => res.json())
      .then((body) => body.facts[0]);
    return message.channel.send(
        new MessageEmbed()
      .setTitle("Dog Facts!")
      .setThumbnail('https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2020%2F09%2F22%2F50-cute-dog-names.jpg')
      .setColor('RANDOM')
      .setDescription(`${fact}`)
      .setFooter("Did you know it?")
      .setTimestamp()
    );
  },
};