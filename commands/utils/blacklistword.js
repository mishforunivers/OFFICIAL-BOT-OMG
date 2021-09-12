const { Client, Message, MessageEmbed } = require('discord.js');
const { Collection } = require("discord.js")
const { blacklistedWords } = require("../../Collection")
const Schema = require("../../models/blacklist-word");

module.exports = {
    name: 'blacklistword',
    aliases: ["blw", "blacklistw", "wordblacklist"],
    description: "blacklists a word from use (auto delete)",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return;

        const query = args[0]?.toLowerCase();
        const guild = { Guild: message.guild.id}
        if (query === "add") {
            const word = args[1]?.toLowerCase();
            if(!word) return message.channel.send("Please specify a word to blacklist");

            Schema.findOne(guild, async(err, data) => {
                if(data) {
                    if(data.Words.includes(word)) return message.reply("That word is already blacklisted")
                    data.Words.push(word);
                    data.save();
                    blacklistedWords.get(message.guild.id).push(word);
                } else {
                    new Schema({
                        Guild: message.guild.id,
                        Words: word
                    }).save();

                    Collection.set(message.guild.id, [ word ])
                }
                message.reply(`**${word}** is now blacklisted from server!`)
            })
        } else if(query === 'remove') {
            const word = args[1]?.toLowerCase();
            if(!word) return message.channel.send("Please specify a word to blacklist");

            Schema.findOne(guild, async(err, data) => {
                if(!data) return message.channel.send("This server has no blacklisted words!")

                if(!data.Words.includes(word)) return message.channel.send("That word doesn't exists in blacklist list!")

                const filtered = data.Words.filter((target) => target !== word);
                
                await Schema.findOneAndUpdate(guild, {
                    Guild: message.guild.id,
                    Words: filtered
                }) 
                
                blacklistedWords.set(message.guild.id, filtered)
            })
            mesage.reply("Word has been removed from blacklisted list!")
        } else if(query === 'display') {
            Schema.findOne(guild, async(err, data) => {
                if(!data) return message.reply("There are no blacklisted words");
                message.channel.send(
                    new MessageEmbed()
                    .setTitle("Blacklisted Words")
                    .setDescription(data.Words.join(','))
                )
            })
        } else if(query === 'collection') {
            const getCollection = Collection.get(message.guild.id);
            if(getCollection)
             return message.channel.send(getCollection, { code: 'js'})
             message.channel.send("Nothing found! try again!");
        } else return message.channel.send("That query doesnt exists! try using [add, remove, display, collection]")
    }
}