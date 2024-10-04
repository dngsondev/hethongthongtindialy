const searchStore = require('../models/searchStore')

class SearchControllers {

    // search(req, res) {
    //     getStores(req, res)
    // }

    index(req, res) {
        searchStore(req, res)
    }

}

module.exports = new SearchControllers