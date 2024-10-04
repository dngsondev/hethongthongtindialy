const loginRouter = require('./login')
const mapRouter = require('./map')
const searchRouter = require('./search')
const getStores = require('../app/models/getStores')

function route(app){

    app.use('/search', searchRouter)

    app.use('/map', mapRouter)

    app.use('/login', loginRouter)

    app.get('/', (req, res) => {
        getStores(req, res)
        // console.log(req.session.results)
        console.log(req.session.searchCH)
        if (req.session.loggedin) {
            res.render('home',{ username: req.session.username, results: req.session.results, searchCH: req.session.searchCH });
        } else {
            res.render('login');
        }
    })
}

module.exports = route