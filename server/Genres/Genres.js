const mongoose = require('mongoose')

const GenreScheme = new mongoose.Schema({
    name: String,
    key: Number,
})

module.exports = mongoose.model('genre', GenreScheme)