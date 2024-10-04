const loginRouter = require('./login')
const mapRouter = require('./map')
const searchRouter = require('./search')
// const getStores = require('../app/models/getStores')

function route(app){

    app.use('/search', searchRouter)

    app.use('/map', mapRouter)

    app.use('/login', loginRouter)

    app.get('/', (req, res) => {
        if (req.session.loggedin) {
            res.redirect('/map')
        }
        else{
            res.render('login')
        }
    })
}

module.exports = route