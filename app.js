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

// set static page source
app.use(express.static('public'))

// index route
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// show detail route
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

// search route
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  // return restaurant which has keyword in its name or category
  const restaurantFound = restaurantList.results.filter(restaurant => {
    const name = restaurant.name.toLowerCase()
    const category = restaurant.category.toLowerCase()
    return name.includes(keyword) || category.includes(keyword)
  })
  // render index or noresult depends on whether there is found restaurant
  if (restaurantFound.length > 0) {
    res.render('index', { restaurants: restaurantFound, keyword: keyword })
  } else {
    res.render('noresult', { keyword: keyword })
  }
})

// start server listening
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
