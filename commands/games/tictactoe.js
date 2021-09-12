const { tictactoe } = require('reconlx');

module.exports = {
    name: 'tictactoe',
    aliases: ["ttt"],
    run: async(client, message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.channel.send('Please mention a member to play , your going to play yourself? ')

        new tictactoe({
            player_two: member,
            message: message
        })
    }
}