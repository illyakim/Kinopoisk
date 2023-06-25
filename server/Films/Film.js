const mongoose = require('mongoose')

const FilmScheme = new mongoose.Schema({
    titleRus: String,
    titleEng: String,
    year: Number,
    time: String,
    country: String,
    genre: String,
    image: String
})

module.exports = mongoose.model('film', FilmScheme)