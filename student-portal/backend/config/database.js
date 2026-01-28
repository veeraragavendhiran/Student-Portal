const { Sequelize } = require('sequelize');
const path = require('path');

// This tells Sequelize to create a file named 'database.db'
// right inside your 'backend' folder
const storagePath = path.join(__dirname, '..', 'database.db');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: console.log // This shows you the SQL commands in the terminal
});

module.exports = { sequelize };