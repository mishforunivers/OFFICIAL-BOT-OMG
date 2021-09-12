const client = require("../index");
const { antijoin } = require("../Collection")

client.on("guildMemberAdd", async (member) => {
    const getCollection = antijoin.get(member.guild.id);
    if(!getCollection) return;
    if(!getCollection.includes((value => value.id === member.id))) {
        getCollection.push(member.user);
    }
    member.kick({ reason: "Antijoin was enabled" });
})