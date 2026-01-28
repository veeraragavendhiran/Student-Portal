const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User'); // We need this to link a resource to a user

const Resource = sequelize.define('Resource', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true // Description can be optional
  },
  link: {
    type: DataTypes.STRING, // This will be a URL to a video, Google Doc, or PDF
    allowNull: false
  }
});

// --- This is the key part ---
// We are creating a relationship in our SQL database.
// This says: "One User (a teacher) can have many Resources."
User.hasMany(Resource);
Resource.belongsTo(User); // This adds a 'UserId' column to the Resource table

module.exports = Resource;