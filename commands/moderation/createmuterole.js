const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "createmuterole",
  description: "Creates muted role!",
  run: async (client, message, args) => {
muteRole = await message.guild.roles.create({
  data: {
name: "Muted",
color: "RED",
permissions:["SEND_MESSAGES"]
  }
});
message.guild.channels.cache.forEach(async (channel, id) => {
await channel.createOverwrite(muteRole, {
SEND_MESSAGES: false,
  MANAGE_MESSAGES: false,
        ADD_REACTIONS: false
             });
          });
      const created = new MessageEmbed()
      .setTitle("Role Created")
      .setDescription("The Role Muted  Has Been Created")
      .setColor("RANDOM")
      message.channel.send(created)
       }
}