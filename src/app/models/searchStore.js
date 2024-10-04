const connection = require('../../db/db')

function searchStore(request, response) {
    let search = request.body.search
    console.log(search)
    connection.query('SELECT * FROM cuahang WHERE tenCH LIKE ?', ['%' + search + '%'], function(error, results, fields) {
        if (error) throw error;
        let searchCH = results.map(result => result);
        request.session.searchCH = searchCH;
        // console.log(request.session.searchCH)
        //response.redirect('/')		
    });
}

module.exports = searchStore