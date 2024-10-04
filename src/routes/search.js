const express = require('express')
const router = express.Router()
const SearchControllers = require('../app/controllers/SearchControllers')

router.post('/', SearchControllers.search)

module.exports = router