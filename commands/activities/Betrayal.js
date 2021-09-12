const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
name: 'betrayal',
category: 'fun',

/** 
* @param {Client} client 
* @param {Message} message 
* @param {String[]} args 
*/
run: async(client, message, args) => { 
    let channel = message.member.voice.channel;
    if(!channel) return message.channel.send(` You need to be in a voice channel first!`);
    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: "773336526917861400",
            target_type: 2,
            temporary: false,
            validate: null
        }),
        headers: {
            "Authorization": `Bot ${client.token}`,
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).then(invite => {
        if(!invite.code) return message.channel.send(` Sorry, I cannot start a YT Together`);
        message.channel.send(` https://discord.com/invite/${invite.code}`)
    })
    }
};