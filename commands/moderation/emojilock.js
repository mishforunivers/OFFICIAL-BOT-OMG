const Discord = require('discord.js');

module.exports = {
	name: 'restrict',
    aliases: ['emojilock'],
	Description: 'restrict an emoji to a mentioned role',
	usage: '<emoji> <@role>',
	run: async(client, message, args) => {
		if (!args[0])
			return message.channel.send(' Please enter an emoji to lock.');
		if (!args[1])
			return message.channel.send(
				' Please enter a role to add to the emoji lock'
			);

		let emoji = Discord.Util.parseEmoji(args[0]);
		if (!emoji) return message.channel.send('Emoji not found !');

		const role =
			message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
		if (!role) return message.channel.send(' Role not found !');

		let restriction = message.guild.emojis.cache.get(emoji.id);
		restriction.roles.add(role);
		message.channel.send( new Discord.MessageEmbed()
        .setTitle("Success")
        .setDescription(`\`SUCCESS\` | The ${role} role has been **added** to restriction of this emoji (<:${
            emoji.name
        }:${emoji.id}>) !`)
        .setTimestamp()
        .setColor("RANDOM"))
	}
};