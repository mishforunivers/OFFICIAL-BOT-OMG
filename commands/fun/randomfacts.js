const {MessageEmbed} = require("discord.js");
const request = require('node-superfetch');
module.exports = {
    name: "randomfacts",
    aliases: ["rf"],
    description: "Shows random facts",

/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
run: async (bot, message, args) => {
  const { body } = await request.get('https://uselessfacts.jsph.pl/random.json?language=en');
  return message.channel.send(
      new MessageEmbed()
      .setTitle("Random Facts!")
      .setDescription(`Random Fact: ${body.text}`)
      .setColor("RANDOM")
      .setFooter("Did you know it?")
      .setTimestamp()
  );
}
}