const connection = require('../../db/db')

function statisticalCH(request, response) {
    let maCH = request.body.maCHHT;
    let startDate = request.body.ngaybatdau; 
    let endDate = request.body.ngayketthuc;
    console.log(maCH, startDate, endDate);

    // Make sure to use placeholders (?) for query parameters to prevent SQL injection
    connection.query('SELECT * FROM hoadon WHERE ngaylapHD BETWEEN ? AND ? AND maCH = ?', [startDate, endDate, maCH], function(error, results, fields) {
        if (error) throw error;
        console.log(results);
        // Process the results as needed, for example, store them in a session or send a response
        // let CH = results.map(result => result);
        // request.session.results = CH;
        // response.send(results); // Sending the results back as the response
    });
}


module.exports = statisticalCH