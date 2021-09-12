const { MessageEmbed } = require('discord.js');
const _ = require('lodash');
const config= require("../../config.json")

module.exports = {
  name: 'listrole',
  aliases: [ 'allrole' ],
  description: 'Displays in list all of the roles this server has',
  get examples(){ return [this.name, ...this.aliases ];},
  run: async (client, message) => {
    try{
      message.channel.send(
    new MessageEmbed()
    .setColor('GREY')
    .setAuthor(` ${message.guild.name} Roles List`)
    .setFooter("If all role doesnt show please dm bot developers!")
    .setTimestamp()
    .addFields(
      _.chunk(message.guild.roles.cache.array()
        .filter(x => x.id !== message.guild.id)
        .sort((A,B) => B.rawPosition - A.rawPosition), 10)
        .map(x => {
          return {
            name: '\u200b', inline: false,
            value: '\u200b' + x.map(x => `\u2000•\u2000${x}`).join('\n')
          };
        })
    )
  )

} catch (err) {
  return message.channel.send(`Loading Roles.....`).then((msg) => {
      setTimeout(() => {
          msg.edit(`An Unexpected Error Occured: **${err}**`);
      }, 3000)
})
}
}}