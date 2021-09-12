const { MessageAttachment } = require("discord.js")
module.exports = {
name: "pikachu",
run: async(client, message, args) => {
const text = args.join(" ")
if(!text) return message.reply("Please provide text!")
let image = `https://api.popcatdev.repl.co/pikachu?text=${encodeURIComponent(text)}`
let imgae = new MessageAttachment(image, "pika.png")
message.channel.send(imgae)
}
}