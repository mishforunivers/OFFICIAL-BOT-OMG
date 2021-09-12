const { Client, Message, MessageEmbed, Util } = require('discord.js');
const Schema = require("../../models/reaction-roles")

module.exports = {
    name: 'addr',
    description: "creates reaction roles embed",
    usage: "--addr @role or ROLE ID <emoji>",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) return;
        const role = message.mentions.roles.first() ||message.guild.roles.cache.get(args[0])

        let [, emoji] = args;
        if(!emoji) return message.reply("Please specify a emoji")

        const parsedEmoji = Util.parseEmoji(emoji);

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) {
                data.Roles[parsedEmoji.name] = [
                    role.id,
                    {
                        id: parsedEmoji.id,
                        raw: emoji 
                    }
                ]

                await Schema.findOneAndUpdate({ Guild: message.guild.id}, data);
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Message: 0,
                    Roles: {
                        [parsedEmoji.name]: [
                            role.id,
                            {
                                id: parsedEmoji.id,
                                raw: emoji 
                            }
                        ]
                    }
                }).save();
            } 
            message.channel.send("Role has been added!")
        })
    }
}