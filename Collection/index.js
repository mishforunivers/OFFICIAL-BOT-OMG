const { Collection } = require("discord.js")

const BlacklistedWords = new Collection()
const afk = new Collection();
const antijoin = new Collection();

module.exports = { afk, antijoin, BlacklistedWords };
