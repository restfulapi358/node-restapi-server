const express = require('express');
const router = express.Router();
const booksService = require('./booksService');

// Route to get all books
router.get('/books', async (req, res) => {
  try {
    const books =  booksService.getBooks(); // Call the service to get books
    res.json(books); // Return the list of books
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books', error: error.message });
  }
});

module.exports = router;