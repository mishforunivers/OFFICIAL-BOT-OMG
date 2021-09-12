const {MessageEmbed} = require("discord.js");

  const fetch = require("node-fetch");
  module.exports = {
    name: "chess",
    description: "Generate a chess.io Link to play a game of chess with your friends (through discord)",
    usage: "chess --> Click on the Link | YOU HAVE TO BE IN A VOICE CHANNEL!",
    /*
755827207812677713 Poker Night
773336526917861400 Betrayal.io
832012586023256104 Chess
773336526917861400 End-Game
755600276941176913 YouTube Together
814288819477020702 Fishington.io
    */
    run: async (client, message, args) => {
        let channel = message.member.voice.channel;
        if(!channel) return message.channel.send(` You need to be in a voice channel first!`);
        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "832012586023256104",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(invite => {
            if(!invite.code) return message.channel.send(` Sorry, I cannot start a Chess`);
            message.channel.send(` https://discord.com/invite/${invite.code}`)
        })
        }
    };