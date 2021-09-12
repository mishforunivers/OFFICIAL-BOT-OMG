const Discord = require("discord.js");
const fetch = require('node-fetch');
module.exports = {
  name: 'ds',
  aliases: ['doublestruck'],

run: async(client, message, args) => {
  let text = args.join("+")
  if(!text) return message.reply('You need to provide some text!')
let res = await fetch('https://api.popcatdev.repl.co/doublestruck?text=' + text);
let json = await res.json();
message.channel.send(json.text)
 }
}