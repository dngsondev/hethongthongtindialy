const statisticalCH = require('../models/statistical')

class StatisticalControllers {
    statistical(request, response) {
        statisticalCH(request, response)
    }
}

module.exports = new StatisticalControllers