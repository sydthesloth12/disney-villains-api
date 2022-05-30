const Sequelize = require('sequelize')
const villainsModel = require('./villains')

const connection = new Sequelize('villains', 'villain_user1', 'password1234', {
  host: 'localhost',
  dialect: 'mysql'
})

const villains = villainsModel(connection, Sequelize)

module.exports = { villains }