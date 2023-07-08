const express = require('express')
const router = express.Router()
const { saveToWatch } = require('./controller')

router.post('/api/saveToWatch', saveToWatch)

writeDataGenre()

module.exports = router