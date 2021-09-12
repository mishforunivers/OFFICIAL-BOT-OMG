const mongoose = require('mongoose');

module.exports = mongoose.model(
'keyss',
new mongoose.Schema({
    user: String,
    key: String
}));