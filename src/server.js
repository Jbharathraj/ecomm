const express = require('express');
const app = express();
const PORT = 3000;

// Import product data
const { data } = require('./Data/data');

// Serve static files (images, CSS, etc.)
app.use('/images', express.static('public/images'));

// API endpoint to get all products
app.get('/api/products', (req, res) => {
  res.json(data);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
