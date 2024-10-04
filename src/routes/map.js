const express = require('express')
const router = express.Router()
const mapControllers = require('../app/controllers/MapControllers')

router.post('/addmarker', mapControllers.addMarker)

module.exports = router