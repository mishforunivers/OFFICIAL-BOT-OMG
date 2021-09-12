const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'emojistats',
    description: "Shows emojis infos",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const config = [100, 200, 300, 500];
    const emo = config[message.guild.premiumTier];
    const se = `**${message.guild.emojis.cache.filter(e => !e.animated).size} / ${emo / 2}** (${emo / 2 - message.guild.emojis.cache.filter(e => !e.animated).size} left, ${Number((message.guild.emojis.cache.filter(e => !e.animated).size / emo / 2) * 100).toFixed(2)}% full)`;
const ae = `**${message.guild.emojis.cache.filter(e => !e.animated).size} / ${emo / 2}** (${emo / 2 - message.guild.emojis.cache.filter(e => e.animated).size} left, ${Number((message.guild.emojis.cache.filter(e => e.animated).size / emo / 2) * 100).toFixed(2)}% full)`;
const te = `**${message.guild.emojis.cache.size} / ${emo}** (${emo - message.guild.emojis.cache.size} left, ${Number((message.guild.emojis.cache.size / emo) * 100).toFixed(2)}% full)`;
const server = message.guild;
const embed = new MessageEmbed() 
.setColor('RANDOM')
.setTimestamp()
.setTitle("Emoji Stats!")
.setThumbnail(server.iconURL({dynamic: true})) 
.addField(`Static Emojis:`, se )
.addField(`Animated Emojis:`, ae )
.addField(`Total Emojis:`, te )
message.channel.send(embed);
}
    }
