const discord = require("discord.js");
module.exports = {
    name: "botclear",
    aliases: [ "bclear"],
    description: "Clears bot's messages!",
/***
* @param {Discord.client} bot the discord bot client.
* @param {Discord.messsage} message the initial message sent by the user.
* @param {array} args an array of arguments
 */
run: async (bot, message, args) => {
    try {
        message.channel.messages.fetch().then(messages => {
            const botMessages = messages.filter(msg => msg.author.bot);
            message.channel.bulkDelete(botMessages);
        });
    } catch (err) {
        return;
    }
    message.delete();
}
};