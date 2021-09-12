const fetch = require("node-fetch");
module.exports = {
    name: 'dadjoke',
run: async(client, message, args) => {
let res = await fetch("https://api.popcatdev.repl.co/joke")
let jokes = await res.json()
message.channel.send(jokes.joke)
    }
}