const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require('ms')

module.exports = {
    name: 'reminder',
    description: "reminds you",
    aliases: ["remindme"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let reminder = args.slice(1).join(' ');
        let time = args[0];

        const noDurationEmbed = new MessageEmbed()
        .setTitle("Error!")
        .setColor("RED")
        .setDescription('Please provide a duration!')
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp();

    if (!time) return message.channel.send(noDurationEmbed)

    const noReminderEmbed = new MessageEmbed()
    .setTitle("Error!")
    .setColor("RED")
    .setDescription('Please provide a reminder!')
    .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp();

   if (!reminder) return message.channel.send(noReminderEmbed)

    const reminderSetEmbed = new MessageEmbed()
    .setColor("BLUE")
    .setAuthor("Reminder set", message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`Successfully set ${message.author.tag}'s reminder!`)
    .addField('Remind In', `${time}`)
    .addField('Reminder', `${reminder}`)
    .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp()

    message.channel.send(reminderSetEmbed);

    setTimeout(async function () {
        message.channel.send(`<@${message.author.id}> here is your reminder!`);

        const reminderAlertEmbed = new MessageEmbed()
        .setAuthor("Reminder Alert!", message.author.displayAvatarURL({ dynamic: true }))
        .setColor("BLUE")
        .addField('Reminder', `${reminder}`)
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp();

        message.channel.send(reminderAlertEmbed)

     },ms (time));
    }
}