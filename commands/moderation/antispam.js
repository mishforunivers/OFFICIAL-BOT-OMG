const db = require('quick.db')

module.exports = {
    name : 'antispam',
    run : async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You dont have permission to do that.')
        if(args[0] === 'on') {
            await db.set(`antispam-${message.guild.id}`, true)
            message.channel.send('Turned on antispam')
        } else if(args[0] === 'off') {
            await db.delete(`antispam-${message.guild.id}`, true)
            message.channel.send('Turned off antispam')
        }
    }
}