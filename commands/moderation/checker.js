const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const db = require('../../models/key');
const db1 = require('../../models/keys');
require('discord-reply');

module.exports = {
    name: 'checker',
    description: 'Check your key!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

    run: async (client, message, args) => {
        let key = args.join(" ");
        if (!key) return message.reply('Please provide the key you wanna check!')
        if (key.length > 9) return message.reply('That is an invalid key!');

        db.findOne({
            client: client.user.id
        }, async (err, data) => {
            if (!data) return message.reply("The are no generated keys available right now!");
            let wew = data;
            if (data.keys.includes(key)) {
                db1.findOne({
                    user: message.author.id
                }, async (err, data) => {
                    if (!data) {
                        data = new db1({
                            user: message.author.id,
                            key
                        }).save()

                        removeA(wew.keys, key)
                        wew.save();
                        console.log(wew.keys);
                        
                        message.channel.send('You are verified! You gucci now!')
                    } else {
                        return message.channel.send('You already have a key active!!')
                    }
                })
            }
        })
    }
}

function removeA(arr) {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}