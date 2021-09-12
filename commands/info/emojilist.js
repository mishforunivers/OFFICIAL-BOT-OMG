const { Client, Message, MessageEmbed } = require('discord.js');


module.exports = {
    name: 'emojilist',
    aliases: ["listemoji"],
    description: "shows all the emoji in the server!",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const list = []

        let emojis = message.guild.emojis.cache.array()
        if(emojis.size === 0) return message.channel.send("There are no emojis in the server!")
        emojis = emojis.map((e, i) => `${i + 1}. ${e} \\${e}`);
        for (var i = 0; i < emojis.length; i += 10) {
            const items = emojis.slice(i, i + 10);
            list.push(items.join("\n"));
        }

        const symbols = ["➡️", "⏹️", "⬅️"];
        let page = 0
        let e = new MessageEmbed()
        .setTitle("Emojis List!")
        .setDescription(list[page])
        .setFooter(`Page ${page + 1} of ${list.length}`)

        const msg = await message.channel.send({embed: e});
        symbols.forEach(symbol => msg.react(symbol))
        let doing = true

        while(doing) {
            let r;
            const filter = (r, u) => symbols.includes(r.emojis.name) && u.id === message.author.id;
            try {
                r = await msg.awaitReactions(filter, {max: 1, time: 60000, errors: ["time"]})

            }
            catch {
                return message.channel.send("Command timed out");

            }
            const u = message.author;
            r = r.first();
            if(r.emojis.name = symbols[0]) {
                if(!list[page + 1]) msg.reactions.resolve(r.emoji.name).users.remove(u.id).catch(err => {})
                else {
                    page++;
                    msg.reactions.resolve(r.emoji.name).users.remove(u.id).catch(err => {})
                    let newM = new MessageEmbed()
                    .setDescription(list[page])
                    .setFooter(`Page ${page + 1} of ${list.length}`)
                    msg.edit(newM)
                }
            } else if(r.emoji.name == symbols[2]) {
                if(!list[page + 1]) msg.reactions.resolve(r.emoji.name).users.remove(u.id).catch(err => {})
                else {
                    page--;
                    msg.reactions.resolve(r.emoji.name).users.remove(u.id).catch(err => {})
                    let newM = new MessageEmbed()
                    .setDescription(list[page])
                    .setFooter(`Page ${page + 1} of ${list.length}`)
                    msg.edit(newM)
                }
            } else if (r.emoji.name == symbols[1]) {
                msg.reactions.removeAll();
                return
            }
        
        }
    }
}