const express = require('express')
const app = express()
const rowdy = require('rowdy-logger')

const rowdyRes = rowdy.begin(app)

app.set('view engine', 'ejs')
app.use(require('express-ejs-layouts'))
app.use(require('method-override')('_method'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('hello from root!')
})

app.use('/countries', require('./controllers/countriesController'))
app.use('/continents', require('./controllers/continentsController'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('server started!');
  rowdyRes.print()
})
