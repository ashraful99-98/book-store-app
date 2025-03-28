const Book = require("../models/Book");
const { faker } = require("@faker-js/faker");

// Generate Fake Books
const generateBooks = (seed, page, likesAvg, reviewsAvg) => {
    faker.seed(parseInt(seed) + page);
    let books = [];

    for (let i = 0; i < 20; i++) {
        books.push({
            isbn: faker.string.numeric(13),
            title: faker.lorem.words(3),
            author: faker.person.fullName(),
            publisher: faker.company.name(),
            likes: Math.round(likesAvg),
            reviews: Math.random() < reviewsAvg ? Math.floor(reviewsAvg) + (Math.random() < (reviewsAvg % 1) ? 1 : 0) : 0,
        });
    }

    return books;
};

// Get All Books (from MongoDB)
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a Single Book by ID
const getSingleBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: "Book not found" });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a Book to MongoDB
const createBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Book
const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ error: "Book not found" });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a Book
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ error: "Book not found" });
        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllBooks, getSingleBook, createBook, updateBook, deleteBook };
