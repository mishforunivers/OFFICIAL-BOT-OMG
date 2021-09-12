const Discord = require("discord.js");

module.exports = {
    name: "createvc",
    description: "Create Voice Channels in your Server",
    run: async(client, message , args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
    return message.channel.send("You don't have enough Permissions")
}
    if (!args[0]) {
    return message.channel.send("Please mention the name for the Channel")
}
    message.guild.channels.create(args.slice(0).join(" "), {type: "voice"});

    const embed = new Discord.MessageEmbed()
    .setTitle("Channel Created")
    .setTimestamp()
    .setDescription(`Vocal Channel has been created! `)
    .setColor("RANDOM");
    
    
  message.channel.send(embed);
    }
}