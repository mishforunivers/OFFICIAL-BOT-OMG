const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');


module.exports = {
	name: 'permissions',
	aliases: ['permsfor', 'perms'],
	description: 'List the server permissions of mentioned user or provided ID',
	parameters: ['User ID/Mention'],
	get examples() {
		return [this.name, ...this.aliases].map(x => x + ' <user>');
	},
	run: async (client, message, [member = '']) => {

     try{
    if (!member.match(/\d{17,19}/)){
      member = message.author.id;
    };

    member = await message.guild.members
    .fetch(member.match(/\d{17,19}/)[0])
    .catch(() => null);

    if (!member){
      return message.channel.send(`\\❌ User not found.`);
    };

    const sp = member.permissions.serialize();
    const cp = message.channel.permissionsFor(member).serialize();

    return message.channel.send(
      new MessageEmbed()
      .setColor(member.displayColor || 'GREY')
      .setTitle(`${member.displayName}'s Permissions`)
      .setFooter(`if it doesnt shows, please dm bot developer!`)
      .setTimestamp()
      .setDescription([
        '\\♨️ - This Server',
        '\\#️⃣ - The Current Channel',
        '```properties',
        '♨️ | #️⃣ | Permission',
        '========================================',
        `${Object.keys(sp).map(perm => [
          sp[perm] ? '✔️ |' : '❌ |',
          cp[perm] ? '✔️ |' : '❌ |',
          perm.split('_').map(x => x[0] + x.slice(1).toLowerCase()).join(' ')
        ].join(' ')).join('\n')}`,
        '```'
      ].join('\n'))
    );

  } catch (err) {
    return message.channel.send(`Checking for errors`).then((msg) => {
        setTimeout(() => {
            msg.edit(`An Unexpected Error Occured: **${err}**`);
        }, 3000)
})
}
  }
}