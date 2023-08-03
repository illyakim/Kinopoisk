const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FilmScheme = new mongoose.Schema({
    titleRus: String,
    titleEng: String,
    year: Number,
    time: String,
    video: String,
    country: { type: Schema.Types.ObjectId, ref: 'country' },
    genre: { type: Schema.Types.ObjectId, ref: 'genre' },
    image: String,
    author: { type: Schema.Types.ObjectId, ref: 'user' }
})

module.exports = mongoose.model('film', FilmScheme)