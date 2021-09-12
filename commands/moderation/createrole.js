const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "createrole",
  description: "This command creates a role with the name of what you say",
  category: "moderation",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("You need `MANAGE_ROLES` permission.");
    }
    const roleName = args[0];

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("I need `MANAGE_ROLES` permission.");
    }

    if (!roleName) {
      message.channel.send("Please specify a role name!");
    }
    if (roleName) {
      message.guild.roles.create({
        data: {
          name: roleName,
          color: "RANDOM",
        },
      });

      const embed = new MessageEmbed()
        .setTitle(`Created Role: ${roleName}`)
        .setDescription(
          `Successfully created the \`${roleName}\` role`
        )
        .setColor("RANDOM")
        .setTimestamp();
      message.channel.send(embed);
    }
    await client.emit(
      "modlog",
      message.guild,
      "No one",
      "create-role",
      "None",
      message.member.user
    );
  },
};