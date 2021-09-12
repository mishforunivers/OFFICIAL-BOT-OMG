const { Collection, Client,  MessageEmbed, Intents } = require('discord.js')
const fs = require('fs')
const discord = require('discord.js');
const Discord = require('discord.js');
const db = require('quick.db')
const client = new Client({
    disableEveryone: true,
    partials : ["MESSAGE", "CHANNEL", "REACTION"]
})
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mish:mish02071@cluster0.znat2.mongodb.net/Data', {
    useUnifiedTopology : true,
    useNewUrlParser : true,
}).then(console.log('Connected to mongo'))
const moment = require("moment")
const blacklistedWords = new Collection();
const { GiveawaysManager } = require('discord-giveaways')
const Messages = require("discord-messages");
const fetch = require('node-fetch')
const config = require('./config.json');

const premiumSchema = require("./models/premium")
const GhostPing = require('discord.js-ghost-ping')
const schema = require("./models/custom-commands")
const altSchema = require("./models/alt")
const reactionSchema = require("./models/reaction-roles")
const altlog = require("./models/alt-logs")
const toggle = require("./models/command")
const ee = require("./embed.json"); //Loading all embed settings like color footertext and icon ...
const emoji = require(`./emojis.json`);
const blacklistuser = require('./models/blacklistuser');

const prefix = config.prefix
const configs = {
    roleID: "857597715758972968",
    guildID:"840212032816939049",
    link:"prooo"
    }

const token = config.token
client.config = config
client.giveawaysManager = new GiveawaysManager(client, {
    
    storage: "./giveaways.json",
    updateCountdownEvery: 10000,
    embedColor: "PURPLE",
    reaction: '🎉',
    pauseOptions: {
        isPaused: true,
        content: ' 🔴**THIS GIVEAWAY IS PAUSED !**🔴 ',
        unPauseAfter: null,
        embedColor: '#FFFF00'
    }
})
client.giveawaysManager.on(
    "giveawayReactionAdded",
    async (giveaway, reactor, messageReaction) => {
      if (reactor.user.bot) return;
      try {
        if (giveaway.extraData) {
          await client.guilds.cache.get(giveaway.extraData.server).members.fetch(reactor.id)
        }
        reactor.send(
          new Discord.MessageEmbed()
            .setTimestamp()
            .setTitle("Entery Approved! | You have a chance to win!!")
            .setDescription(
              `Your entery to [This Giveaway](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}) has been approved!`
            )
            .setFooter("Univers Official Bot")
            .setTimestamp()
        );
      } catch (error) {
        const guildx = client.guilds.cache.get(giveaway.extraData.server)
        messageReaction.users.remove(reactor.user);
        reactor.send(new Discord.MessageEmbed()
          .setTimestamp()
          .setTitle(":x: Entery Denied | Databse Entery Not Found & Returned!")
          .setDescription(
            `Your entery to [This Giveaway](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}) has been denied as you did not join **${guildx.name}**`
          )
          .setFooter("Univers Official Bot")
        );
      }
    }
  );
  // Check if user reacts on an ended giveaway
client.giveawaysManager.on('endedGiveawayReactionAdded', (giveaway, member, reaction) => {
    reaction.users.remove(member.user);
    member.send(`**Aw snap! Looks Like that giveaway has already ended!**`)
  
  });
  // Dm our winners
  client.giveawaysManager.on('giveawayEnded', (giveaway, winners) => {
    winners.forEach((member) => {
      member.send(new Discord.MessageEmbed()
        .setTitle(`🎁 Let's goo!`)
        .setDescription(`Hello there ${member.user}\n I heard that you have won **[[This Giveaway]](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID})**\n Good Job On Winning **${giveaway.prize}!**\nDirect Message the host to claim your prize!!`)
        .setTimestamp()
        .setFooter(member.user.username, member.user.displayAvatarURL())
      );
    });
  });
  // Dm Rerolled winners
  client.giveawaysManager.on('giveawayRerolled', (giveaway, winners) => {
    winners.forEach((member) => {
      member.send(new Discord.MessageEmbed()
        .setTitle(`🎁 Let's goo! We Have A New Winner`)
        .setDescription(`Hello there ${member.user}\n I heard that the host rerolled and you have won **[[This Giveaway]](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID})**\n Good Job On Winning **${giveaway.prize}!**\nDirect Message the host to claim your prize!!`)
        .setTimestamp()
        .setFooter(member.user.username, member.user.displayAvatarURL())
      );
    });
  });
  // When They Remove Reaction
  client.giveawaysManager.on('giveawayReactionRemoved', (giveaway, member, reaction) => {
    return member.send(new Discord.MessageEmbed()
      .setTimestamp()
      .setTitle('❓ Hold Up Did You Just Remove a Reaction From A Giveaway?')
      .setDescription(
        `Your entery to [This Giveaway](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}) was recorded but you un-reacted, since you don't need **${giveaway.prize}** I would have to choose someone else 😭`
      )
      .setFooter("Think It was a mistake? Go react again!")
    );
  });
client.commands = new Collection();
client.embed = new MessageEmbed()
client.aliases = new Collection()
const Timeout = new Collection();
module.exports = client;
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);

}); 
client.on('ready', () => {
    
    client.user.setActivity(db.get(`status`));
    console.log(`${client.user.username} ✅`)

})


client.on('message', async message =>{
    if(message.author.bot) return;
    
    if(!message.content.startsWith(prefix)) return;
    blacklistuser.findOne({ id : message.author.id }, async(err, data) => {
        if(err) throw err;
        if(!data) {
            if(!message.guild) return;
            const AddMessage = await Messages.appendMessage(message.author.id, message.guild.id, 1);
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    const data1 = await schema.findOne({ Guild: message.guild.id, Command: cmd })
    if (data1) message.channel.send(data1.Response)
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
      
        const check = await toggle.findOne({ Guild: message.guild.id })
        if(check) {
            if(check.Cmds.includes(command.name)) return message.channel.send("This command has been disabled by admins")
        }
        if(command.premium && !(await premiumSchema.findOne({ User: message.author.id }))) return message.reply("You need to upgrade to premium to access this command!")
        command.run(client, message, args)
       
    }
    
    } else {
            message.channel.send("Your blacklisted from using commands!")
        }
            
        
        
      const modlogsSchema = require("./models/modlogs");
      client.modlogs = async function({ Member, Action, Color, Reason }, message) {
          const data = await modlogsSchema.findOne({ Guild: message.guild.id })
          if(!data) return;
  
          const channel = message.guild.channels.cache.get(data.Channel)
          const logsEmbed = new MessageEmbed()
          .setColor(Color)
          .setDescription(`Reason: ${Reason || 'No Reason'}`)
          .setTitle(`Action Took: ${Action}`)
          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
          .addField('Member', `${Member.user.tag} (${Member.id})`)
          channel.send(logsEmbed)

          const thanks = new Discord.MessageEmbed()
                .setTitle("Thanks !")
                .setDescription(`Thanks for support us by boosting ${after.name} !\n${user.roles.cache.has(role) ? `You now have the ${role.name} role` : ""}`)
                .setTimestamp()
                .setColor('PINK')
            
            user.send(thanks).catch(() => {});
        
      }
      })
    });
    
    



    client.on('messageUpdate',async(oldMessage, newMessage)=>{
        require('./events/messageUpdate')(oldMessage,newMessage)
    })
    client.on('messageDelete',async(message)=>{
        require('./events/messageDelete')(message)
    })
    client.on('roleCreate',async(roleCreate)=>{
        require('./events/roleadd')(roleCreate)
    })
    client.on('roleDelete',async(roleDelete)=>{
        require('./events/roleremove')(roleDelete)
    })
    client.on('channelCreate',async(channelCreate)=>{
        require('./events/channelcreate')(channelCreate)
    })
    client.on('channelDelete',async(channelDelete)=>{
        require('./events/channelDelete')(channelDelete)
    })
    client.on('emojiCreate',async(emojiCreate)=>{
        require('./events/emojiCreate')(emojiCreate)
    })
    client.on('emojiDelete',async(emojiDelete)=>{
        require('./events/emojiDelete')(emojiDelete)
    })
    client.on('nickChange',async(oldNickname,newNickname)=>{
        require('./events/nicklog')(oldNickname,newNickname)
    })
    client.on('emojiUpdate',async(oldEmoji,newEmoji)=>{
        require('./events/emojiupdate')(oldEmoji,newEmoji)
    })
    client.on('channelsPinsUpdate',async(channel, time)=>{
        require('./events/channelsPinsUpdate')(channel, time)
    })
    client.on('channelUpdate',async(oldChannel,newChannel)=>{
        require('./events/channelUpdate')(oldChannel,newChannel)
    })
    client.on('RoleUpdate',async(oldRole,newRole)=>{
        require('./events/RoleUpdate')(oldRole,newRole)
    })
    client.on('guildMemberUpdate',async(oldUser,newUser)=>{
        require('./events/guildMemberUpdate')(oldUser,newUser)
    })
    client.on('UserUpdate',async(oldUser,newUser)=>{
        require('./events/UserUpdate')(oldUser,newUser)
    })

    
        client.on('voiceStateUpdate', (oldUser, newUser) => {
            let newUserChannel = newUser.channelID;
            let oldUserChannel = oldUser.channelID;
          
            const channel = client.channels.cache.get('862420837788418078');
          
            if (oldUserChannel === (undefined || null) && newUserChannel !== (undefined || null)) {
                channel.send(new MessageEmbed()
                    .setTitle("Member Connected!")
                    .setDescription(`**${newUser.member.user.tag}** (${newUser.member.user.id}) connect to a voice channel (**${newUser.channel.name}**)`)
                    .setThumbnail(`${oldUser.member.user.displayAvatarURL({ dynamic: true })}`)
                    .setColor('GREEN')
                    .setTimestamp()
                )
            } else if (newUserChannel === (undefined || null) && oldUserChannel !== (undefined || null)) {
                channel.send(new MessageEmbed()
                    .setTitle("Voice deconnect")
                    .setDescription(`**${newUser.member.user.tag}** (${newUser.member.user.id}) disconnected from a voice channel (**${oldUser.channel.name}**)`)
                    .setThumbnail(`${newUser.member.user.displayAvatarURL({ dynamic: true })}`)
                    .setColor('RED')
                    .setTimestamp()
                );
            } else if (!newUserChannel === (undefined || null) && oldUserChannel !== (undefined || null) && newUserChannel !== oldUserChannel) {
                channel.send(new MessageEmbed()
                    .setColor('PURPLE')
                    .setTimestamp()
                    .setDescription(`**${newUser.member.user.tag}** (${newUser.member.user.id}) move in voice channel.`)
                    .addField('Old Channel', oldUser.channel.name, true)
                    .addField('New Channel', newUser.channel.name, true)
                    .setThumbnail(`${oldUser.member.user.displayAvatarURL({ dynamic: true })}`)
                )
            }
            if (newUser.mute && !oldUser.mute) {
                channel.send(new MessageEmbed()
                .setTitle("Member Muted")
                .setDescription(`${oldUser.member.user.tag} has been muted by ${newUser.member.user.tag} in **<#${oldUser.channel.id}>** `)
                .setThumbnail(`${oldUser.member.user.displayAvatarURL({ dynamic: true })}`)
                .setColor("RANDOM")
                .setTimestamp()
                )
            } else if (!newUser.mute && oldUser.mute) {
                channel.send(new MessageEmbed()
                .setTitle("Member Unmuted")
                .setDescription(`${oldUser.member.user.tag} has been unmuted by ${newUser.member.user.tag} in **<#${oldUser.channel.id}>** `)
                .setThumbnail(`${newUser.member.user.displayAvatarURL({ dynamic: true })}`)
                .setColor("RANDOM")
                .setTimestamp()
                )
            };
            if (newUser.selfMute && !oldUser.selfMute) {
                channel.send(new MessageEmbed()
                .setTitle("Member Auto Muted")
                .setDescription(`${oldUser.member.user.tag} has been Auto Muted in **<#${oldUser.channel.id}>** `)
                .setThumbnail(`${newUser.member.user.displayAvatarURL({ dynamic: true })}`)
                .setColor("RANDOM")
                .setTimestamp()
                )
            } else if (!newUser.selfMute && oldUser.selfMute) {
                channel.send(new MessageEmbed()
                .setTitle("Member Auto Unmuted")
                .setDescription(`${oldUser.member.user.tag} has been Auto Unmuted in **<#${oldUser.channel.id}>** `)
                .setThumbnail(`${newUser.member.user.displayAvatarURL({ dynamic: true })}`)
                .setColor("RANDOM")
                .setTimestamp()
                )
            };
        })
        client.on('userUpdate', async(before, after) => {
            if (before.username !== after.username) {
              client.channels.cache.get('862420837788418078').send( new MessageEmbed()
              .setTitle("Username Changed")
              .setDescription(`**${after.username}** has changed their Username!
              Old Username: **${before.username}**
              New Username: **${after.username}**`)
              .setColor("RANDOM")
              .setTimestamp())
              .catch(() => {});
            };
          })
          client.on('userUpdate', async(before, after) => {
            if (before.avatar !== after.avatar) {
              client.channels.cache.get('862420837788418078').send( new MessageEmbed()
              .setTitle("Avatar changed")
              .setDescription(`**${after.username}** has changed their Avatar!`)
              .addField("Old Avatar", `[Old Avatar Link](${before.avatarURL({dynamic: true})})`)
              .addField("New Avatar", `[New Avatar Link](${after.avatarURL({dynamic: true})})`)


              .setColor("RANDOM")
              .setTimestamp()
              ).catch(() => {});
            };
          })
          client.on('userUpdate', async(before, after) => {
            if (before.discriminator !== after.discriminator) {
              client.channels.cache.get('862420837788418078').send( new MessageEmbed()
              .setTitle("Discriminator Changed")
              .setDescription(`**${after.username}** has changed their Discriminator!
              Old Discriminator: **${before.discriminator}**
              New Discriminator: **${after.discriminator}**`)
              .setColor("RANDOM")
              .setTimestamp())
              .catch(() => {});
            };
          })
        client.on('message', message => {
            if (message.content.includes("@everyone")) {
              if (!(message.member.hasPermission('ADMINISTRATOR'))) {
                message.member.kick()
                message.delete();
              }
            }
          });
          client.on('presenceUpdate', async (oldPresence, newPresence) => {
            const role = newPresence.guild.roles.cache.get("842090944542670858");
            const member = newPresence.member
            const activities = member.user.presence.activities[0];

            if (!member) return;
            if (!role) return;
            if (!activities) return;  

            if (activities.state && (activities.state.includes( ".gg/univers" ) || activities.state.includes("discord.gg/univers" ))) {
              return newPresence.member.roles.add(role)
            } else {
              if(member.roles.cache.get(role.id)) {
                newPresence.member.roles.remove(role)
              }
            }
        });
        altSchema
          
        client.on("message", async(message) => {
        if(message.content.startsWith("--snipe")) {
            let channel = message.mentions.channels.first() || message.channel
            let msg = client.snipe.get(channel.id)
            if(!msg) return message.channel.send("There is nothing to snipe")
            let embed = new Discord.MessageEmbed()
            .setTitle(msg.author.tag)
            .setThumbnail(msg.author.displayAvatarURL({dynamic: true}
            ))
            .setColor("RANDOM")
            .addField("Content", msg.content)
            .setTimestamp()
            .setFooter("Univers Official Bot")
            if(msg.attachments.first()) embed.setImage(msg.attachments.first().url)
            message.channel.send(embed)
        }
           })
           client.on("guildMemberAdd", async (member) => {
            altSchema.findOne({ Guild: member.guild.id }, async (err, data) => {
              if (!data) return;
              if (data.Avatar === "Enabled")
                if (member.user.avatar === null) {
                  await member
                    .send(
                      new MessageEmbed()
                        .setTitle(`Univers Alt Detector`)
                        .setDescription(
                          `You were kicked from ${member.guild.name} | The bot has identified you as an alt.`
                        )
                        .setColor("RANDOM")
                        .setTimestamp()
                        .setFooter(`Univers Official Bot`)
                    )
                    .catch((er) => {
                      member.kick("Account might be an alt!");
                    });
          
                  await member.kick("Account might be an alt!");
                }
          
              if (data.Days == "0") return;
              let f = Date.now() - member.user.createdAt;
              let create = Math.floor(f / 86400000);
              let AltAccAge = data.Days;
              if (create >= AltAccAge) return;
              if (create < AltAccAge) {
                await member
                  .send(
                    new MessageEmbed()
                      .setTitle(`Univers Bot Alt Detector`)
                      .setDescription(
                        `You have been kicked from ${member.guild.name} | client was because your account age is below the server's account age requirement.`
                      )
                      .setColor("RANDOM")
                      .setFooter(`Univers Official Bot`)
                      .setTimestamp()
                  )
                  .catch((err) => {
                    member.kick("Account age is below the server requirement!");
                  });
          
                await member.kick("Account age is below the server requirement!");
              }
          
              await altlog.findOne({ Guild: member.guild.id }, async(err, data1) => {
                if (!data1) return;
                const channel = member.guild.channels.cache.get(data1.Channel);
                const embed = new MessageEmbed()
                  .setTitle("Univers Alt Detector")
                  .setDescription(`⚠ | Alt found`)
                  .addField(`Information`, [
                    `Alt's Name: ${member.user.username}`,
                    `Alt's Tag: ${member.user.discriminator}`,
                  ])
                  .addField("More Information", [
                    `Bot?: ${member.user.bot}`,
                    `Created At: ${moment(member.user.createdTimestamp).format(
                      "LT"
                    )} ${moment(member.user.createdTimestamp).format("LL")}  ${moment(
                      member.user.createdTimestamp
                    ).fromNow()}`,
                    `Joined At: ${moment(member.joinedTimestamp).format("LT")} ${moment(
                      member.joinedTimestamp
                    ).format("LL")}  ${moment(member.joinedTimestamp).fromNow()}`,
                    `Avatar: ${member.user.avatar || `No Avatar`}`,
                    `Minimum Age: ${data.Days} days`,
                  ])
                  .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                  .setColor("RANDOM")
                  .setFooter(`Alt Kicked | Univers`)
                  .setTimestamp();
              });
            });
          })
          client.on("messageReactionAdd", async (messageReaction, user) => {
            if (user.bot) return;
            const { message, emoji } = messageReaction;
            if (client.user.id == user.id) return;
            await reactionSchema.findOne(
              {
                Guild: message.guild.id,
                Channel: message.channel.id,
                Message: message.id,
                Emoji: emoji,
              },
              async (err, data) => {
                if (!data) return;
                const role = await message.guild.roles.cache.get(data.Role);
                if (!role) return data.delete();
                const member = await message.guild.members.cache.get(user.id);
                await member.roles.add(role);
                await member.send({embeds:[
                  new MessageEmbed().setTitle(`Role Added`).setColor("GREEN")
                    .setDescription(`You were given role 
                \`${role.name}\` because you reacted to ${emoji}`)
                ]
                }
                );
              }
            );
          });
          
          client.on("messageReactionRemove", async (messageReaction, user) => {
            const { message, emoji } = messageReaction;
            if (client.user.id == user.id) return;
            await reactionSchema.findOne(
              {
                Guild: message.guild.id,
                Channel: message.channel.id,
                Message: message.id,
                Emoji: emoji,
              },
              async (err, data) => {
                if (!data) return;
                const role = await message.guild.roles.cache.get(data.Role);
                if (!role) return data.delete();
                const member = await message.guild.members.cache.get(user.id);
                await member.roles.remove(role);
                await member.send({embeds: [
                  new MessageEmbed().setTitle(`Role Removed`).setColor("RED")
                    .setDescription(`You lost a role 
                \`${role.name}\` by unreacting ${emoji}`)
                ]
                }
                );
              }
            );
          })

          let antiPingSchema = require("./models/anti-ping");
          client.on("message", async(message) => {
            const spilittedMsgs = message.content.split("");
            const reason = "Anti-Ping System";
            let deleting = false;
            antiPingSchema.findOne({ Guild: message.guild.id }, async (err, data1) => {
              if (data1) {
                const member = message.mentions.members.first();
                if (member) {
                  if (data1.Member.includes(member.id)) {
                    let embed = new MessageEmbed()
                      .setTitle("ANTI-PING")
                      .setDescription(
                        `**<a:No:876198779798310952> ${message.member.user.username} You can't ping \`${member.user.tag}\`**`
                      )
                      .setColor("ORANGE");
                    message.channel.send(embed);
                    message.delete();
                  }
                }
              }
            });
          })
          client.on("guildMemberAdd", async (member) => {

            let message2 = db.fetch(`nickm_${member.guild.id}`);
            if(!message2)
            {
              return;
            }
            
               message2 = message2
                .replace("-username-", `${member.user.username}`);
               member.setNickname(message2);
            
            })
            client.on("guildMemberAdd", async (member) => {
              let autor = db.fetch(`autorole_${member.guild.id}`);
              if(!autor)
              {
                return;
              }
              var role = member.guild.roles.cache.get(`${autor}`);
              member.roles.add(role);
              });
              client.on("message", async(message) => {
                
                const hehe = db.fetch(`antilink_${message.guild.id}`);
               
              
              
             if(hehe == "on")
             {
           
          if (message.content.includes("http://")) {
           message.channel.send(new Discord.MessageEmbed()
           .setTitle("ANTI-LINK")
           .setDescription("<a:No:876198779798310952> AYO AYO, Links are disabled for this server")
           .setColor("RED")
           .setTimestamp()
           )
            message.delete()
          }
         
            if (message.content.includes("discord.gg/")) {
               message.channel.send(new Discord.MessageEmbed()
               .setTitle("ANTI-LINK")
               .setDescription("<a:No:876198779798310952> AYO AYO, Discord Invite Links are disabled for this server")
               .setColor("RED")
               .setTimestamp()
               )
               message.delete();
          }
          if (message.content.includes("Discord.gg/")) {
               message.channel.send(new Discord.MessageEmbed()
               .setTitle("ANTI-LINK")
               .setDescription("<a:No:876198779798310952> AYO AYO, Discord Invite Links are disabled for this server")
               .setColor("RED")
               .setTimestamp()
               )
               message.delete();
          
             }
             if (message.content.includes("DISCORD.GG/"))
               message.channel.send(new Discord.MessageEmbed()
               .setTitle("ANTI-LINK")
               .setDescription("<a:No:876198779798310952> AYO AYO, Discord Invite Links are disabled for this server")
               .setColor("RED")
               .setTimestamp()
               )
               message.delete();
               }
               
              })



client.on("guildMemberAdd", async (member) => {
   
        
  if(db.has(`tagg_${member.guild.id}`) && db.has(`tagn_${member.guild.id}`)) 
{
let name = db.fetch(`tagn_${member.guild.id}`);
let hash = db.fetch(`tagg_${member.guild.id}`);
  if(member.user.username.includes(name))
{
member.roles.add(hash);
}
}
})

module.exports = async (client, oldUser, newUser, member) => {
  let oldMember = oldUser;
  let newMember = newUser;
   if (oldMember.username !== newMember.username) {
   if (oldMember.username === null) {
    var oldNM = "``???? ??????``";
   } else {
    var oldNM = oldMember.username;
   }
   if (newMember.username === null) {
    var newNM = "``???? ??????``";
   } else {
    var newNM = newMember.username;
   }
  
   client.guilds.cache.forEach(guild => {
           
      
        if(guild.member(newUser.id))
        {
            if(db.has(`tagg_${guild.id}`) && db.has(`tagn_${guild.id}`)) 
        {
          let name = db.fetch(`tagn_${guild.id}`);
          var hash = db.fetch(`tagg_${guild.id}`);
            if(newUser.username.includes(name))
   {
     var hash = guild.roles.cache.get(hash);
     let member2 = guild.member(newUser.id);
    member2.roles.add(hash);
     const log = guild.channels.cache.find(log => log.name === "bot")
  if(!log) return;
  if(log.type !== "text") return;
  const embed = new Discord.MessageEmbed()
   .setTitle("OFFICIAL ROLE ADDED")
   .setDescription(`Added Officials role to ${newUser.username}`)
   .addField(`Added Officials role to ${newUser.username} Bcz of autoofficial/anf command You can disable it by doing .autoofficial-disable/.anf-disable`)
  log.send(embed);
   }
     else if(!newUser.username.includes(name))
   {
     var hash = guild.roles.cache.get(hash);
   
     let member2 = guild.member(newUser.id);
     member2.roles.remove(hash);
   }
        }
        }   
   });
 
  }
}
client.on("guildMemberAdd", async (member, message) => {
    const hehe3 = db.fetch(`antibot_${member.guild.id}`);
    
  if(hehe3 == "on") {
    if(member.user.bot) member.kick()
  } else {
    if (hehe3 == "off") {
      return;
    
    }
  }
  
  })     
  client.on("webhookUpdate", async(channel, args) => {
    const webhook = db.fetch(`AutoWebhook_${channel.guild.id}`)
    if (webhook === "off") {
      return
    } else {
        channel.guild.fetchAuditLogs({ type: "WEBHOOK_CREATE"}).then(data => {
            
            
        }).catch(err => console.error(err.message))
        channel.fetchWebhooks().then(webs => webs.each(w => w.delete().catch(reason => console.error(reason.message)).then(() => console.log('Webhook deleted successfully')))).catch(error => console.error(error.message))

      }
     })
     client.on("guildMemberAdd", async member => {
      let chx = db.get(`welchannel_${member.guild.id}`);
      if (chx === null) {
        return;
      }
      let welcome = db.get(`welmessage_${member.guild.id}`);
      if (welcome === null) {
        return;
      }
    
      welcome = welcome.replace('{user}', member);
      welcome = welcome.replace('{user.name}', member.username);
      welcome = welcome.replace('{user.tag}', member.tag);
      welcome = welcome.replace('{user.id}', member.id);
      welcome = welcome.replace('{user.Icon}', member.user.displayAvatarURL({ dynamic: true }))
      welcome = welcome.replace('{membercount}', member.guild.memberCount);
      const ordinal = (member.guild.memberCount.toString().endsWith(1) && !member.guild.memberCount.toString().endsWith(11)) ? 'st' : (member.guild.memberCount.toString().endsWith(2) && !member.guild.memberCount.toString().endsWith(12)) ? 'nd' : (member.guild.memberCount.toString().endsWith(3) && !member.guild.memberCount.toString().endsWith(13)) ? 'rd' : 'th';
      welcome = welcome.replace('{membercount.ordinal}', member.guild.memberCount + ordinal);
      welcome = welcome.replace('{guild.name}', member.guild.name);
      welcome = welcome.replace('{guild.id}', member.guild.id);
      welcome = welcome.replace('{guild.icon}', member.guild.iconURL({ dynamic: true }))
      welcome - welcome.replace('{userCreatedAt}', `${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).format('LTS')} ${moment(member.user.createdTimestamp).fromNow()}`)
      if (welcome) await client.channels.cache.get(chx).send(welcome)
    });
    client.on("guildMemberUpdate", async (oldMember, newMember) => {

      const oldStatus = oldMember.premiumSince
      const newStatus = newMember.premiumSince
      if(!oldStatus && newStatus) {
        let chx1 = db.get(`boostchannel_${newMember.guild.id}`);
        if (chx1=== null) {
          return;
        }
        let boost = db.get(`boostmsg_${newMember.guild.id}`);
        if (boost === null) {
          return;
        } 
        boost = boost.replace('{user}', newMember);
        boost = boost.replace('{user.name}', newMember.username);
        boost = boost.replace('{user.tag}', newMember.tag);
        boost = boost.replace('{user.id}',newMember.id);
        boost = boost.replace('{membercount}', newMember.guild.memberCount);
        boost = boost.replace('{guild.name}', newMember.guild.name);
        boost = boost.replace('{guild.id}', newMember.guild.id);
        boost = boost.replace('{userCreatedAt}', `${moment(newMember.createdTimestamp).format('LL')} ${moment(newMember.createdTimestamp).format('LTS')} ${moment(newMember.createdTimestamp).fromNow()}`)
        boost = boost.replace('{boostcount}', newMember.guild.premiumSubscriptionCount)
        boost = boost.replace('{boosttier}', newMember.guild.premiumTier)
        if (boost) await client.channels.cache.get(chx1).send(new discord.MessageEmbed()
        .setAuthor(newMember.user.displayAvatarURL({ dynamic: true }), `${newMember.tag}`)
        .setDescription(boost)
        .setTimestamp()
        .setColor("RANDOM")
        .setFooter("Univers Official Bot")
        )
        if (oldStatus && !newStatus) return;
      }

    });
        
        
    
client.login(token)