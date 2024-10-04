const addMarker = require('../models/addMarker')

class MapContollers {
    addMarker(req, res) {
        addMarker(req, res)
    }
}

module.exports = new MapContollers