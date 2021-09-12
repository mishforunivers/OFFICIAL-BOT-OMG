const db = require('quick.db')
const discord = require('discord.js')
const moment = require("moment")
const Discord = require('discord.js')
module.exports = {
  name: "welcome",
  aliases: ['welc', 'wlc'],

  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send({ embed: { color: "efa23a", description: `<a:No:876198779798310952> ${message.author}: You're **missing** permission: \`manage_guild\`` } });

    const embed = new discord.MessageEmbed()
      .setTitle(`**--welcome**`)
      .setDescription(`set up a welcome message when new members join`)
      .addField(`**subcommands**`, `--welcome channel -- set where to send welcome messages\n--welcome clear -- clear the welcome message\n--welcome message -- set the welcome message text\n--welcome variables -- see all the welcome message variables\n--welcome test * Test message in welcome channel`)
      .addField(`**usage**`, `--welcome`)
      .addField(`**aliases**`, `welc, wlc`)
      .setColor("GREEN")
    if (!args[0]) return message.channel.send(embed)
    if (args[0].toLowerCase() == 'message') {
      db.set(`welmessage_${message.guild.id}`, args.splice(1).join(' '))
      let wlcmsg = db.get(`welmessage_${message.guild.id}`)
      if (wlcmsg === null) {
        const setmsgembed = new discord.MessageEmbed()
          .setDescription(`<a:No:876198779798310952> ${message.author}: There is no **welcome message** set one with \`--welcome message\``)
          .setColor(`#efa23a`)
        return message.channel.send(setmsgembed)
      } else {
        const setembed = new discord.MessageEmbed()
          .setTitle("welcome message:")
          .setDescription(`\`\`\`` + wlcmsg + `\`\`\``)
          .setFooter(`see the varibles with --welcome variables + test with --welcome test\ndisable with --welcome clear`)
          .setColor("GREEN")
        return message.channel.send(setembed)
      }
    } else if (args[0].toLowerCase() == 'test') {
      let chx = db.get(`welchannel_${message.guild.id}`);
      if (chx === null) {
        return;
      }
      let welcome = db.get(`welmessage_${message.guild.id}`);
      if (welcome === null) {
        return;
      }
      welcome = welcome.replace('{user}', message.member);
      welcome = welcome.replace('{user.name}', message.author.username);
      welcome = welcome.replace('{user.tag}', message.author.tag);
      welcome = welcome.replace('{user.id}', message.author.id);
      welcome = welcome.replace('{user.Icon}', message.author.displayAvatarURL({ dynamic: true}))
      welcome = welcome.replace('{membercount}', message.member.guild.memberCount);
      const ordinal = (message.guild.memberCount.toString().endsWith(1) && !message.guild.memberCount.toString().endsWith(11)) ? 'st' : (message.guild.memberCount.toString().endsWith(2) && !message.guild.memberCount.toString().endsWith(12)) ? 'nd' : (message.guild.memberCount.toString().endsWith(3) && !message.guild.memberCount.toString().endsWith(13)) ? 'rd' : 'th';
      welcome = welcome.replace('{membercount.ordinal}', message.member.guild.memberCount + ordinal);
      welcome = welcome.replace('{guild.name}', message.member.guild.name);
      welcome = welcome.replace('{guild.id}', message.member.guild.id);
      welcome = welcome.replace('{guild.icon}', message.guild.iconURL({ dynamic: true }))
      welcome - welcome.replace('{userCreatedAt}', `${moment(message.member.createdTimestamp).format('LL')} ${moment(message.member.createdTimestamp).format('LTS')} ${moment(message.member.createdTimestamp).fromNow()}`)
      client.channels.cache.get(chx).send(welcome)
      message.channel.send({ embed: { color: "#a3eb7b", description: `<a:Yess:876198935939657750> ${message.author}: Successfully tested your **welcome message** in <#` + chx + `>` } })
      if (chx === null) {
        return message.channel.send({ embed: { color: "#efa23a", description: `<a:No:876198779798310952> ${message.author}: There is no **welcome channel** set for me to test this` } })
      }
    } else if (args[0].toLowerCase() == 'variables') {
      const member = message.author
      const ordinal = (message.guild.memberCount.toString().endsWith(1) && !message.guild.memberCount.toString().endsWith(11)) ? 'st' : (message.guild.memberCount.toString().endsWith(2) && !message.guild.memberCount.toString().endsWith(12)) ? 'nd' : (message.guild.memberCount.toString().endsWith(3) && !message.guild.memberCount.toString().endsWith(13)) ? 'rd' : 'th';
      const variablesembed = new discord.MessageEmbed()
        .setTitle(`welcome variables`)
        .setDescription(`\`{user}\` -- <@` + member + `>\n\`{user.name}\` -- ` + message.author.username + `\n\`{user.tag}\` -- ` + message.author.tag + `\n\`{user.id}\` -- ` + message.author.id + `\n\`{guild.name}\` -- ` + message.member.guild.name + `\n\`{guild.id}\` -- ` + message.member.guild.id + `\n\`{membercount}\` -- ` + message.member.guild.memberCount + `\n\`{membercount.ordinal}\` -- ` + message.member.guild.memberCount + ordinal + `\n\`{user.icon}\` * ` + "User's Icon" + `\n\`{guild.icon}\` * ` + "Shows Guild's icon")
        .setColor("GREEN")
      message.channel.send(variablesembed)
    } else if (args[0].toLowerCase() == "channel") {
      let channel = message.mentions.channels.first()
      if (!channel) {
        const welcomechannel = new discord.MessageEmbed()
          .setTitle(`--welcome channel`)
          .setDescription(`set the channel 4 welcome msgs`)
          .addField(`**usage**`, `--welcome channel [#channel]`)
          .addField(`**aliases**`, `c, chan`)
          .setColor("GREEN")
        return message.channel.send(welcomechannel)
      }
      db.set(`welchannel_${message.guild.id}`, channel.id)
      await message.channel.send(`Set the welcome channel to ${channel}`)
    } else if (args[0].toLowerCase() == "chan") {
      let channel = message.mentions.channels.first()
      if (!channel) {
        const welcomechannel = new discord.MessageEmbed()
          .setTitle(`--welcome channel`)
          .setDescription(`set the channel 4 welcome msgs`)
          .addField(`**usage**`, `--welcome channel [#channel]`)
          .addField(`**aliases**`, `c, chan`)
          .setColor("GREEN")
        return message.channel.send(welcomechannel)
      }
      db.set(`welchannel_${message.guild.id}`, channel.id)
      await message.channel.send({ embed: { color: "#a3eb7b", description: `<a:Yess:876198935939657750> ${message.author}: Set the **welcome channel** to ${channel}` } })
    } else if (args[0].toLowerCase() == "c") {
      let channel = message.mentions.channels.first()
      if (!channel) {
        const welcomechannel = new discord.MessageEmbed()
          .setTitle(`--welcome channel`)
          .setDescription(`set the channel 4 welcome msgs`)
          .addField(`**usage**`, `--welcome channel [#channel]`)
          .addField(`**aliases**`, `c, chan`)
          .setColor("GREEN")
        return message.channel.send(welcomechannel)
      }
      db.set(`welchannel_${message.guild.id}`, channel.id)
      await message.channel.send({ embed: { color: "#a3eb7b", description: `<a:Yess:876198935939657750> ${message.author}: Set the **welcome channel** to ${channel}` } })
    } else if (args[0].toLowerCase() == "clear") {
      db.delete(`welchannel_${message.guild.id}`)
      db.delete(`welmessage_${message.guild.id}`)
      return await message.channel.send({ embed: { color: "#a3eb7b", description: `<a:Yess:876198935939657750> ${message.author}: Successfully cleared the **welcome channel** & **message**` } })
    } else if (args[0].toLowerCase() == "msgreset") {
        const wlcmsg = db.fetch(`welmessage_${message.guild.id}`)
        db.delete(`welmessage_${message.guild.id}`)
        return await message.channel.send({ embed: { color: "#a3eb7b", description: `<a:Yess:876198935939657750> ${message.author}: Successfully reseted **welcome message**. Old Message -- ${wlcmsg}`}})
    } else if (args[0].toLowerCase() == "channelreset") {
        const channel = db.fetch(`welchannel_${message.guild.id}`)
        db.delete(`welchannel_${message.guild.id}`)
        return await message.channel.send({ embed: { color: "#a3eb7b", description: `<a:Yess:876198935939657750> ${message.author}: Successfully reseted **welcome channel**. Old Channel -- ${channel}  ` }})
    } else if (args[0].toLowerCase() == "info") {
        const channel = db.fetch(`welchannel_${message.guild.id}`)
        const wlcmsg = db.fetch(`welmessage_${message.guild.id}`)
        const infoembed = new Discord.MessageEmbed()
        .setTitle("Welcome Information")
        .setDescription("TIP: Use \n--welcome for all options")
        .addField("Channel:", `${channel}` || "No channel setupped yet" )
        .addField("Message:", wlcmsg || "No Message setupped yet")
        .setFooter("Univers Official Bot")
        .setColor("PURPLE")
        .setTimestamp()
        message.channel.send(infoembed)
    }
  }
}