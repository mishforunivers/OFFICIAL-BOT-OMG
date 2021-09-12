const { MessageEmbed } = require('discord.js')

module.exports = {
    name : 'greroll',
    aliases: ["g-reroll"],
    usage: "--reroll [giveaway id]",
    run : async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permission')

        if(!args[0]) return message.channel.send('Please specify a message id')

        if (!args[0]) {
            return message.channel.send(':x: You have to specify a valid message ID!');
        }

        // try to found the giveaway with prize then with ID
        let giveaway =
            // Search with giveaway prize
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            // Search with giveaway ID
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        // If no giveaway was found
        if (!giveaway) {
            return message.channel.send('Unable to find a giveaway for `' + args.join(' ') + '`.');
        }

        // Reroll the giveaway
        client.giveawaysManager.reroll(giveaway.messageID)
            .then(() => {
                // Success message
                message.channel.send('Giveaway rerolled!');
            })
            .catch((e) => {
                if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)) {
                    message.channel.send('This giveaway is not ended!');
                } else {
                    console.error(e);
                    message.channel.send('An error occured...');
                }
            });

    }
}
    
