const mutes = require("../../models/mute1");
const ms = require("ms");
const Discord = require("discord.js")
const muterole = require("../../models/muterole");

module.exports = {
  name: "mute",
  category: "moderation",
  cooldown: 5,
  usage: "<@user> <time>",
  permissions: ["MANAGE_MESSAGES"],
  run: (client, message, args) => {
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    if (!user)
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle("Missing Arguement")
      .setDescription("<a:No:876198779798310952> Specify a Member for Tempmute! EXAMPLE: -- \n`--tempmute <MEMBER> <TIME> ` -- Mutes member")
      .setColor("RED")
      .setTimestamp());
    if (user.id === user.bot)
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle("Missing Arguement")
      .setDescription("<a:No:876198779798310952> You can't mute bots! EXAMPLE: -- \n`--tempmute <MEMBER> <TIME> ` -- Mutes member")
      .setColor("RED")
      .setTimestamp());
      if (user.id === message.author.id)
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle("Uh oh")
      .setDescription("<a:No:876198779798310952> You can't mute yourself lmao ! EXAMPLE: -- \n`--tempmute <MEMBER> <TIME> ` -- Mutes member")
      .setColor("RED")
      .setTimestamp());
      
    let time = args[1];
    if (!time)
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle("Missing Arguement")
      .setDescription("<a:No:876198779798310952> Specify a Time for Tempmute! EXAMPLE: -- \n`--tempmute <MEMBER> <TIME> ` -- Mutes member")
      .setColor("RED")
      .setTimestamp());
    time = ms(time);
    mutes.findOne(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (data)
          return message.channel.send(
            new Discord.MessageEmbed()
            .setTitle("Uh Oh!")
            .setDescription("<a:No:876198779798310952> This person Is already Muted! To Unmute, Use: -- \n`--unmute <MEMBER>` --  unmutes member")
            .setColor("RED")
            .setTimestamp())
          
        muterole.findOne({ Guild: message.guild.id }, async (err, data) => {
          if (!data)
            return message.channel.send(
                new Discord.MessageEmbed()
                .setTitle("Uh Oh!")
                .setDescription("<a:No:876198779798310952> There is no Mute role! To Create, Use: -- \n`--setmuterole <ROLE_ID | MENTION>` -- Creates mute role")
                .setColor("RED")
                .setTimestamp())
            
          new mutes({
            Guild: message.guild.id,
            User: user.id,
            End: Date.now() + time,
          })
            .save()
            .then(() => {
              message.channel.send(
            new Discord.MessageEmbed()
            .setTitle("Done!")
            .setDescription(`<a:Yess:876198935939657750> Updated Member! -- ${user} is now Muted for ${time}  `)
            .setColor("GREEN")
            .setTimestamp());
              
            });
          let member = await message.guild.members.fetch(user.id);
          member.roles.add(data.Role);
          setTimeout(() => {
            member.roles.remove(data.Role);
          }, time);
        });    
})

    }
}