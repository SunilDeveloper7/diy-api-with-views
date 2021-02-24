const router = require('express').Router()

const models = require('../models')

router.get('/', (req, res) => {
  models.continent.findAll().then((continents) => {
    // res.json({ continents })
    res.render('continents/index', { continents })
  })
})

router.post('/', (req, res) => {
  models.continent.create({
    name: req.body.name,
  }).then((continent) => {
    res.json({continent})
  })
})

router.get('/:id', (req, res) => {
  models.continent.findByPk(req.params.id).then((continent => {
    // res.json({ continent })
    res.render('continents/show', { continent })
  }))
})

router.post('/:id/countries', async (req, res) => {
  const continent = await models.continent.findByPk(req.params.id)

  const country = await continent.createCountry({
    name: req.body.name,
    founded: req.body.founded,
    population: req.body.population,
  })

  res.json({country})
})

router.get('/:id/countries', async (req, res) => {
  const continent = await models.continent.findByPk(req.params.id)

  const countries = await continent.getCountries()

  // res.json({ countries })
  // res.render('countries/index', { countries, continent })
  res.render('continents/countries', { countries, continent })
})

router.get('/:id/countries/new', (req, res) => {
  res.render('countries/new', { continentId: req.params.id })
})

module.exports = router