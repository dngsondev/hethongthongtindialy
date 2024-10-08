const express = require('express')
const router = express.Router()

const statisticalControllers = require('../app/controllers/StatisticalControllers')

router.post('/', statisticalControllers.statistical)

module.exports = router