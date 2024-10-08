const statistical = require('../models/statistical')

class StatisticalControllers {
    statistical(request, response) {
        statistical.statistical(request, response)
    }
}

module.exports = new StatisticalControllers