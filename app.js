// set express
const express = require('express')
const app = express()
const port = 3000

// load restaurant data
const restaurantList = require('./restaurant.json')

// set view engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// index route
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// show detail route

// search route

// start server listening
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
