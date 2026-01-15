// Import required packages
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middlewareconst express = require('express');
;

// Increase the limit for JSON and URL-encoded bodies

app.use(cors()); // Enable CORS for frontend communication
app.use(express.json({ limit: '50mb' })); // Parse JSON request bodies
app.use(express.urlencoded({ limit: '50mb',extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/items', itemRoutes); // Item routes

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Lost & Found API is running' });
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});