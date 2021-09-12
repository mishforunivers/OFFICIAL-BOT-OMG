const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'botlist',
    description: "shows all bots in the server",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const botlist = message.guild.members.cache.filter(x => x.user.bot);

        var bots = [];
        botlist.forEach((bot) => {
        bots.push(bot.user.tag);
        bots.sort((a, b) => a + b);
        });
        message.channel.send(
            new MessageEmbed()
            .setTitle("Bots List")
            .setDescription(bots.join("\n"))
            .setColor("RANDOM")
            .setTimestamp())
    }
}
