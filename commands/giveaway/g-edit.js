const { Client, Message, MessageEmbed } = require('discord.js');
const Discord = require("discord.js")
const ms = require('ms');
module.exports = {
    name: 'g-edit',
    aliases: ["gedit"],
    description: "edits currently running giveaway",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
             // If the member doesn't have enough permissions
                if (!message.member.hasPermission("MANAGE_MESSAGES"))
            {
               message.channel.send(
                "You need `MANAGE_MESSAGES` Permission to Access this Command!"
              );
              return;
        }
        
            // If no message ID or giveaway name is specified
            if(!args[0]){
                return message.channel.send(':x: You have to specify a valid message ID!');
            }
        
            // If no field to edit is specifed
            if(!args[1]){
                return message.channel.send(new Discord.MessageEmbed()
                .setTitle("PLEASE USE VALID PARAMETER")
                .setColor("RED")
                .setDescription("`--g-edit <GIVEAWAY_ID> prize <PRIZE_NAME>` -- *Changes Giveaway's Prize name*\n`--g-edit <GIVEAWAY_ID> winners <WINNERSAMOUNT>` -- *Changes giveaway's Winners amount*")
                .addField("If you want to change all of them by 1 command, please use", "`--g edit <GIVEAWAY_ID> <NEW_TIME> <WINNERS> <PRIZE>`")
                );
            }
        
            if(args[1] === 'prize'){
                let newPrize = args.slice(2).join(' ')
        
                if(!newPrize) return message.channel.send(':x: You have to provide a new prize!');
        
                client.giveawaysManager.edit(args[0], {
                    newPrize: newPrize,
                }).then(() => {
                    // here, we can calculate the time after which we are sure that the lib will update the giveaway
                    const numberOfSecondsMax = client.giveawaysManager.options.updateCountdownEvery / 1000;
                    message.channel.send('✅ The giveaway prize will updated in less than ' + numberOfSecondsMax + ' seconds.');
                }).catch((err) => {
                    message.channel.send(`:x: No giveaway found for \`${args[0]}\`, please check you have the right message and try again.`);
                });
            }else
            if(args[1] === 'winners'){
                let newWinners = args[2]
                if(isNaN(newWinners) || (parseInt(newWinners) <= 0)){
                    return message.channel.send(':x: You have to specify a valid number of winners!');
                }
        
                client.giveawaysManager.edit(args[0], {
                    newWinnerCount: newWinners,
                }).then(() => {
                    // here, we can calculate the time after which we are sure that the lib will update the giveaway
                    const numberOfSecondsMax = client.giveawaysManager.options.updateCountdownEvery / 1000;
                    message.channel.send('✅ The giveaway winner count will updated in less than ' + numberOfSecondsMax + ' seconds.');
                }).catch((err) => {
                    message.channel.send(`:x: No giveaway found for \`${args[0]}\`, please check you have the right message and try again.`);
                });
            }else{
                return message.channel.send(':x: You need to either edit the prize or the winners!');
            }
        }
        }