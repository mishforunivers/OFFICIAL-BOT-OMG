const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'premium',
    aliases: ["premiuminfo"],
    description: "shows all information about premium system",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle(`Premium information!`)
        .setDescription("Must dm <@766242519817912340> to purchase!")
        .addField("Anti-VC"," - Bans user from joining every vocal channel!")
        .addField("Anti-Mention system", "- Auto mute/warn user for lot of mentions!")
        .addField("Anti-join System", "- Prevents from raid (auto-kick)")
        .addField("Gif searcher", "- search gif!")
        .addField("Search user", " by words in the server")
        .setTimestamp()

        message.channel.send(embed)
    }
}