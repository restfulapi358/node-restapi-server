const express = require('express');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Basic route
app.get('/v1/api', (req, res) => {
  res.json({message: 'Welcome to my RESTful API'});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});