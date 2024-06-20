const express = require('express');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// /hello route
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// /shutdown route
app.post('/shutdown', (req, res) => {
  res.json({ message: 'Server shutting down...' });
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Basic route
app.get('/v1/api', (req, res) => {
  res.json({message: 'Welcome to my RESTful API'});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
