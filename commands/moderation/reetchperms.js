const { Client, Message, MessageEmbed } = require("discord.js")

module.exports = {
  name: 'resetchperms',
  aliases: [ 'rch', 'resetchannelpermissions', 'resetchannelperms' ],
  category: 'Info',
  description: `Removes all permission overwrites and resets @everyone permissions to \`unset\``,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try{
    if (!message.member.hasPermission("MANAGE_CHANNE;S"))
    return message.channel.send(
      `You don't have the correct permissions for that!`
    );

  if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
    return message.channel.send(
      "I need manage channels permissions to run this command! [MANAGE_CHANNELS]"
    )

    message.channel.overwritePermissions([
        { id: message.guild.roles.everyone.id }
      ]).then(ch => message.channel.send(`Sucesssfully reset the permissions for this channel.`))
    .catch(() => message.channel.send(`Unable to reset the permissions for this channel.`))

  } catch (err) {
    return message.channel.send(`Looking for errors.....`).then((msg) => {
        setTimeout(() => {
            msg.edit(`An Unexpected Error Occured: **${err}**`);
        }, 3000)
})
}

  }}