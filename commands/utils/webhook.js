const { WebhookClient, MessageEmbed } = require('discord.js')

module.exports = {
    name : 'webhook',
    run : async(client, message, args) => {
    const wc = new WebhookClient('854032129347420160', 'VMkIlQuGily-j3Y4fAFEt90qYURl_0lvPqjyk3kQ-C9KELDiSm6siXNukt306DgzCJAL')
        const embed = new MessageEmbed()
            .setTitle("Webhook").setColor("RANDOM").setTimestamp().setDescription(args.join(" "))
    wc.send({
        username : message.author.tag,
        avatarURL : message.author.displayAvatarURL({ dynamic : true }),
        embeds : [embed]
    })
    }
}