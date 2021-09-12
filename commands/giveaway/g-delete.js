const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'g-delete',
    aliases: ["gdelete"],
    description: "deletes current running giveaway",
    usage: "--g-delete <Giveaway message ID>",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let messageID = args[0]
        if (messageID) return message.channel.send(
            new MessageEmbed()
            .setTitle("ERROR!")
            .setDescription('No giveaway found for **' + messageID + '**, or Message is invalid!')
            .addField("To view all running giveaways please use", "--g-list")
            .setColor("RED")
            .setFooter("Univers Official Bot")
            .setTimestamp())

            client.giveawaysManager.delete(messageID).then(() => {
                message.channel.send(`Giveaway has been deleted! ID of the giveaway was: **${messageID}**`)
            }).catch((err) => {
                message.channel.send("An unexpected error, error: " + err )
            })
        
    }
}