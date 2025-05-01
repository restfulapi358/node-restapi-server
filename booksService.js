// Mock data for books, you can replace this with a call to a real API or database
const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1984', author: 'George Orwell' },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen' },
  ];
  
  function getBooks() {
    return books;
  }
  
  module.exports = {
    getBooks,
  };