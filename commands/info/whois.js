const Discord = require("discord.js")
const moment = require('moment');

const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
};

module.exports = {
        name: "whois",
        description: "userinfo",
        usage: "m/whois <mention a member/member id>",
        aliases: ['ui', 'userinfo'],
    run: async (bot, message, args, client) => {
        const flags = {
            DISCORD_EMPLOYEE: 'Discord Employee',
            DISCORD_PARTNER: 'Discord Partner',
            BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
            BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
            HYPESQUAD_EVENTS: 'HypeSquad Events',
            HOUSE_BRAVERY: 'House of Bravery',
            HOUSE_BRILLIANCE: 'House of Brilliance',
            HOUSE_BALANCE: 'House of Balance',
            EARLY_SUPPORTER: 'Early Supporter',
            TEAM_USER: 'Team User',
            SYSTEM: 'System',
            VERIFIED_BOT: 'Verified Bot',
            VERIFIED_DEVELOPER: 'Verified Bot Developer'
        };
        var permissions = [];
        var acknowledgements = 'None';
        let whoisPermErr = new Discord.MessageEmbed()
        .setTitle("**User Permission Error!**")
        .setDescription("**Sorry, you don't have permissions to use this! ❌**")

        if(!message.channel.permissionsFor(message.author).has("SEND_MESSAGES") ) return message.channel.send(whoisPermErr)

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);
        const userFlags = member.user.flags.toArray();
        

        if(member.hasPermission("KICK_MEMBERS")){
            permissions.push("Kick Members");
        }
        
        if(member.hasPermission("BAN_MEMBERS")){
            permissions.push("Ban Members");
        }
        
        if(member.hasPermission("ADMINISTRATOR")){
            permissions.push("Administrator");
        }
    
        if(member.hasPermission("MANAGE_MESSAGES")){
            permissions.push("Manage Messages");
        }
        
        if(member.hasPermission("MANAGE_CHANNELS")){
            permissions.push("Manage Channels");
        }
        
        if(member.hasPermission("MENTION_EVERYONE")){
            permissions.push("Mention Everyone");
        }
    
        if(member.hasPermission("MANAGE_NICKNAMES")){
            permissions.push("Manage Nicknames");
        }
    
        if(member.hasPermission("MANAGE_ROLES")){
            permissions.push("Manage Roles");
        }
    
        if(member.hasPermission("MANAGE_WEBHOOKS")){
            permissions.push("Manage Webhooks");
        }
    
        if(member.hasPermission("MANAGE_EMOJIS")){
            permissions.push("Manage Emojis");
        }
    
        if(permissions.length == 0){
            permissions.push("No Key Permissions Found");
        }
    
        if(member.user.id == message.guild.ownerID){
            acknowledgements = 'Server Owner';
        }

        const embed = new Discord.MessageEmbed()
            .setDescription(`<@${member.user.id}>`)
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
            .setColor("RANDOM")
            .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .addField(`__Username:__`, ` ${member.user.username}`)
            .addField(`__Discriminator:__`, `${member.user.discriminator}`)
            .addField(`__ID:__`, `${message.author.id}`)
            .addField(`__Avatar:__`, `[Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`)
            .addField(`__Status:__`, `${member.user.presence.status}`)
            .addField(`__Badges:__`, `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,)
            .addField(`__Game:__`, `${member.user.presence.game || 'Not playing a game.'}`)
            .addField('__Joined at:__ ',`${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
            .addField('__Created On__',  `${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).format('LTS')} ${moment(member.user.createdTimestamp).fromNow()}`)
            .addField(`\n__Roles [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]__`,`${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "No Roles"}`)
            .addField("\n__Acknowledgements:__ ", `${acknowledgements}`)
            .addField("\n__Permissions:__ ", `${permissions.join(` | `)}`)
            .addField('Member', [
                ` Highest Role: ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
                ` Hoist Role: ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
                ` Roles [${roles.length}]: ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? `${roles.slice(0, 10).join(', ')}\n+${roles.length-10} roles...` : 'None'}`,
                `\u200b`
            ]);
            
        message.channel.send({embed});
    
    }
    }