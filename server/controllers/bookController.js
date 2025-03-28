const Book = require("../models/Book");
const { faker } = require("@faker-js/faker");

// Generate fake books
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

// Fetch books (from MongoDB or generate fake ones)
const getBooks = async (req, res) => {
    const { seed, page = 0, likes = 5, reviews = 3 } = req.query;

    if (!seed) return res.status(400).json({ error: "Seed value is required" });

    let books = generateBooks(seed, parseInt(page), parseFloat(likes), parseFloat(reviews));

    // Save generated books to MongoDB
    await Book.insertMany(books);

    res.json(books);
};

// Create a new book
const createBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        // const existbook = new Book.findById({ title });
        // if (book === existbook) {
        //     res.status(401).json({ error: "Book is already exist in database." })
        // }
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single book by ID
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: "Book not found" });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a book
const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ error: "Book not found" });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ error: "Book not found" });
        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getBooks, createBook, getBookById, updateBook, deleteBook };
