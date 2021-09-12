const got = require('got')
const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'randomgif',
    aliases: ["rg", "gifrandom"],
    run : async(client, message) => {
        got('https://www.reddit.com/r/gifs/random/.json').then(res => {
            let content = JSON.parse(res.body)
            const number = Math.floor(Math.random() * content.length);
            message.channel.send(
                new MessageEmbed()
                    .setTitle(content[number].data.children[number].data.title)
                    .setImage(content[number].data.children[number].data.url)
                    .setColor("RANDOM")
                    .setFooter(`👍 ${content[number].data.children[number].data.ups} 👎 ${content[number].data.children[number].data.downs} | Comments : ${content[number].data.children[number].data.num_comments}`)
            )
        })
    }
}