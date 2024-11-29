const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const resourceRoutes = require('./routes/resourceRoutes');
const cronJob = require('./services/expiryService');

// Use bodyParser middleware to parse JSON data
app.use(bodyParser.json());

// Optionally, use the authentication middleware
// app.use(authenticateUser); 

// Use the resource routes
app.use('/api', resourceRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
