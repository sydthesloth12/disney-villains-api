const express = require('express')
const bodyparser = require('body-parser')
const { getAllVillains, getVillainBySlug, addVillain } = require('./controllers/villains')

const app = express()

app.get('/villains', getAllVillains)

app.get('/villains/:slug', getVillainBySlug)

app.post('/villains', bodyparser.json(), addVillain)

app.listen(1337, () => {
  // eslint-disable-next-line no-console
  console.log('listening @ http://localhost:1337')
})