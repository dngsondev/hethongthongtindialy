const connection = require('../../db/db')

function getStores(request, response) {
    connection.query('SELECT * FROM cuahang', function(error, results, fields) {
        console.log(results)
        if (error) throw error;
        let CH = results.map(result => result);
        request.session.results = CH;
    });
}

module.exports = getStores