const Discord = require("discord.js")
module.exports = {
name: "colorify",
run: async(client, message, args) => {
let pinged = message.mentions.users.first();
let color = args[1];
if(!pinged) {
pinged = message.author;
color = args[0]
}
if(!color) return message.reply("Please provide the name of the color with which you want to colorify the avatar! Example: `>colorify @user color` or `>colorify color`")
let av = pinged.displayAvatarURL({ dynamic: true })
let image = `https://api.popcatdev.repl.co/colorify?image=${av}&color=${color}`
let em = new Discord.MessageEmbed()
.setTitle("Colored Picture Of " + pinged.username)
.setImage(image)
.setColor(color.toUpperCase())
.setFooter("If the color shown is just grey, it is not supported.")

message.channel.send(em)
}
}