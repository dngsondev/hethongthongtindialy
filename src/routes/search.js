const express = require('express')
const router = express.Router()
const SearchControllers = require('../app/controllers/SearchControllers')

router.post('/', SearchControllers.index)

module.exports = router