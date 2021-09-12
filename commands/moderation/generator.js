const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const db = require('../../models/key');
module.exports = {
    name: 'generator',
    description: 'Generate keys!!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

    run: async (client, message, args) => {
        // add a check so that only you can use it! [this is for testing so i dont need!]
        if (!message.member.permissions.has("ADMINISTRATOR")) return;
        
        function generatePassword() {
            var length = 9,
                charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                retVal = "";
            for (var i = 0, n = charset.length; i < length; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * n));
            }
            return retVal;
        }

        let key = generatePassword();

        await db.findOne({
            client: client.user.id
        }, async (err, data) => {
            if (!data) {
                data = new db({
                    client: client.user.id,
                    keys: [key]
                }).save()
                return message.reply(`Key successfully generated!\n**KEY** || ${key} ||`)
            } else {
                data.keys.push(key);
                data.save();
                return message.reply(`Key successfully generated!\n**KEY** || ${key} ||`)
            }
        })

    }
}