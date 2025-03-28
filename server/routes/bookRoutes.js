const express = require("express");
const { getBooks, createBook, getBookById, updateBook, deleteBook } = require("../controllers/bookController");

const router = express.Router();

// Routes for books
router.get("/books", getBooks); // Fetch books (fake/generated)
router.post("/books", createBook); // Create a new book
router.get("/books/:id", getBookById); // Get single book
router.put("/books/:id", updateBook); // Update book
router.delete("/books/:id", deleteBook); // Delete book

module.exports = router;
