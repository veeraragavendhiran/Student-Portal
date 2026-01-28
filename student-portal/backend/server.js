const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/database');

// --- 1. IMPORT YOUR MODELS ---
const User = require('./models/User');
const Resource = require('./models/Resource'); // <-- 1. ADD THIS LINE

// --- 2. IMPORT YOUR ROUTES ---
const authRoutes = require('./routes/auth');
const resourceRoutes = require('./routes/resources'); // <-- 2. ADD THIS LINE

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- 3. CONNECT AND SYNC DB ---
const connectAndSyncDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('SQLite Connection has been established successfully. 🐘');

    // This sync command will now find User AND Resource models
    await sequelize.sync({ force: false });
    console.log('All models were synchronized successfully. 🔄');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
connectAndSyncDB();

// --- 4. USE YOUR ROUTES ---
// This tells Express to use your auth.js file
app.use('/api/auth', authRoutes); 
app.use('/api/resources', resourceRoutes); // <-- 3. ADD THIS LINE

// Simple Test Route
app.get('/', (req, res) => {
  res.send('Hello! Your SQL API server is running.');
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});