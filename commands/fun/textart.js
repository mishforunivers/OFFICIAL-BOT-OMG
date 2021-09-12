const { Client, Message, MessageEmbed } = require('discord.js');
const figlet = require("figlet")

module.exports = {
    name: 'textart',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        // ['i, 'like', 'nbanasn']
        // i like bananas
        figlet.text(
            args.join(" "),
            {
                font: "Ghost",
            },
            async (err, data) => {
                message.channel.send(`\`\`\`${data}\`\`\``);
            }
        );
    },
};