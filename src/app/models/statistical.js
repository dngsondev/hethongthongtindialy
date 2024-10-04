const connection = require('../../db/db')

function statistical(request, response) {
    connection.query('SELECT * FROM hoadon', function(error, results, fields) {
        if (error) throw error;
        // let CH = results.map(result => result);
        // request.session.results = CH;
    });
}

module.exports = statistical