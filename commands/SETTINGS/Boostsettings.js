const db = require('quick.db')
const discord = require('discord.js')
const moment = require("moment")
const Discord = require('discord.js')
const MessageEmbed = require('discord.js')
module.exports = {
  name: "boost",
  aliases: ['configboost', 'boostsettings'],
  timeout: 6000,

  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send({ embed: { color: "efa23a", description: `<a:No:876198779798310952> ${message.author}: You're **missing** permission: \`ADMINISTRATOR\`` } });

    const embed = new discord.MessageEmbed()
      .setTitle(`**--boost**`)
      .setDescription(`set up a boost message when someone boosts server`)
      .addField(`**subcommands**`, `--boost channel -- set where to send boost messages\n--boost clear -- clear the boost message\n--boost message -- set the boost message text\n--boost variables -- see all the boost message variables\n--boost test * Test message in boost channel\n--boost info -- shows boost settings\n--boost msgreset -- resets boost message\n--boost channelreset -- resets boost channel\n--boost embeddisable -- disables embed message  `)
      .addField(`**usage**`, `--boost`)
      .addField(`**aliases**`, `configboost, boostsettings`)
      .setColor("GREEN")
    if (!args[0]) return message.channel.send(embed)
    if (args[0].toLowerCase() == 'message') {
      db.set(`boostmsg_${message.guild.id}`, args.splice(1).join(' '))
      let boostmsg = db.get(`boostmsg_${message.guild.id}`)
      if (boostmsg === null) {
        const setmsgembed = new discord.MessageEmbed()
          .setDescription(`<a:No:876198779798310952> ${message.author}: There is no **boost message** set one with \`--boost message\``)
          .setColor(`#efa23a`)
        return message.channel.send(setmsgembed)
      } else {
        const setembed = new discord.MessageEmbed()
          .setTitle("boost message:")
          .setDescription(`\`\`\`` + boostmsg + `\`\`\``)
          .setFooter(`see the varibles with --boost variables + test with --boost test\ndisable with --boost msgreset`)
          .setColor("GREEN")
        return message.channel.send(setembed)
      }
    } 
     else if (args[0].toLowerCase() == 'test') {
      let chx1 = db.get(`boostchannel_${message.guild.id}`);
      if (chx1 === null) {
        return;
      }
      
      let boost = db.get(`boostmsg_${message.guild.id}`);
      if (boost === null) {
        return;
      }
      boost = boost.replace('{user}', message.member);
      boost = boost.replace('{user.name}', message.author.username);
      boost = boost.replace('{user.tag}', message.author.tag);
      boost = boost.replace('{user.id}', message.author.id);
      boost = boost.replace('{guild.name}', message.member.guild.name);
      boost = boost.replace('{membercount}', message.guild.memberCount);
      boost = boost.replace('{guild.id}', message.member.guild.id);
      boost = boost.replace('{userCreatedAt}', `${moment(message.member.createdTimestamp).format('LL')} ${moment(message.member.createdTimestamp).format('LTS')} ${moment(message.member.createdTimestamp).fromNow()}`)
      boost = boost.replace('{boostcount}', message.guild.premiumSubscriptionCount)
      boost = boost.replace('{boosttier}', message.guild.premiumTier)
      client.channels.cache.get(chx1).send(new discord.MessageEmbed()
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(boost)
        .setTimestamp()
        .setColor("RANDOM")
        .setFooter("Univers Official Bot")
        )
      message.channel.send({ embed: { color: "#a3eb7b", description: `<a:Yess:876198935939657750> ${message.author}: Successfully tested your **boost message** in <#` + chx1 + `>` } })
      if (chx1 === null) {
        return message.channel.send({ embed: { color: "#efa23a", description: `<a:No:876198779798310952> ${message.author}: There is no **boost channel** set for me to test this` } })
      }

    } else if (args[0].toLowerCase() == 'variables') {
      const member = message.author
      const variablesembed = new discord.MessageEmbed()
        .setTitle(`boost variables`)
        .setDescription(`\`{user}\` -- <@` + member + `>\n\`{user.name}\` -- ` + message.author.username + `\n\`{user.tag}\` -- ` + message.author.tag + `\n\`{user.id}\` -- ` + message.author.id + `\n\`{guild.name}\` -- ` + message.member.guild.name + `\n\`{guild.id}\` -- ` + message.member.guild.id + `\n\`{boostcount}\` -- ` + message.member.guild.premiumSubscriptionCount + `\n\`{boosttier}\` -- ` + message.member.guild.premiumTier + `\n\`{user.icon}\` * ` + "User's Icon" + `\n\`{guild.icon}\` * ` + "Shows Guild's icon")
        .setColor("GREEN")
      message.channel.send(variablesembed)
    } else if (args[0].toLowerCase() == "channel") {
      let channel = message.mentions.channels.first()
      if (!channel) {
        const boostchannel = new discord.MessageEmbed()
          .setTitle(`--boost channel`)
          .setDescription(`set the channel 4 boost msgs`)
          .addField(`**usage**`, `--boost channel [#channel]`)
          .addField(`**aliases**`, `c, chan`)
          .setColor("GREEN")
        return message.channel.send(boostchannel)
      }
      db.set(`boostchannel_${message.guild.id}`, channel.id)
      await message.channel.send(`Set the boost channel to ${channel}`)
    } else if (args[0].toLowerCase() == "chan") {
      let channel = message.mentions.channels.first()
      if (!channel) {
        const boostchannel = new discord.MessageEmbed()
          .setTitle(`--boost channel`)
          .setDescription(`set the channel 4 boost msgs`)
          .addField(`**usage**`, `--boost channel [#channel]`)
          .addField(`**aliases**`, `c, chan`)
          .setColor("GREEN")
        return message.channel.send(boostchannel)
      }
      db.set(`boostchannel_${message.guild.id}`, channel.id)
      await message.channel.send({ embed: { color: "#a3eb7b", description: `<a:Yess:876198935939657750> ${message.author}: Set the **boost channel** to ${channel}` } })
    } else if (args[0].toLowerCase() == "c") {
      let channel = message.mentions.channels.first()
      if (!channel) {
        const boostchannel = new discord.MessageEmbed()
          .setTitle(`--boost channel`)
          .setDescription(`set the channel 4 boost msgs`)
          .addField(`**usage**`, `--boost channel [#channel]`)
          .addField(`**aliases**`, `c, chan`)
          .setColor("GREEN")
        return message.channel.send(boostchannel)
      }
      db.set(`boostchannel_${message.guild.id}`, channel.id)
      await message.channel.send({ embed: { color: "#a3eb7b", description: `<a:Yess:876198935939657750> ${message.author}: Set the **boost channel** to ${channel}` } })
    } else if (args[0].toLowerCase() == "clear") {
      db.delete(`boostchannel_${message.guild.id}`)
      db.delete(`boostmsg_${message.guild.id}`)
      return await message.channel.send({ embed: { color: "#a3eb7b", description: `<a:Yess:876198935939657750> ${message.author}: Successfully cleared the **boost channel** & **message**` } })
    } else if (args[0].toLowerCase() == "msgreset") {
        const boostmsg = db.fetch(`boostmsg_${message.guild.id}`)
        db.delete(`boostmsg_${message.guild.id}`)
        return await message.channel.send({ embed: { color: "#a3eb7b", description: `<a:Yess:876198935939657750> ${message.author}: Successfully reseted **boost message**. Old Message -- ${boostmsg}`}})
    } else if (args[0].toLowerCase() == "channelreset") {
        const channel = db.fetch(`boostchannel_${message.guild.id}`)
        db.delete(`boostchannel_${message.guild.id}`)
        return await message.channel.send({ embed: { color: "#a3eb7b", description: `<a:Yess:876198935939657750> ${message.author}: Successfully reseted **boost channel**. Old Channel -- ${channel}  ` }})
    } else if (args[0].toLowerCase() == "info") {
        const channel = db.fetch(`boostchannel_${message.guild.id}`)
        const boostmsg = db.fetch(`boostmsg_${message.guild.id}`)
        const infoembed = new Discord.MessageEmbed()
        .setTitle("boost Information")
        .setDescription("TIP: Use \n--boost for all options")
        .addField("Channel:", `<#${channel}>` || "No channel setupped yet" )
        .addField("Message:", boostmsg || "No Message setupped yet")
        .setFooter("Univers Official Bot")
        .setColor("PURPLE")
        .setTimestamp()
        message.channel.send(infoembed)
    } 
  } 
}