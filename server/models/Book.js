const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    isbn: String,
    title: String,
    author: String,
    publisher: String,
    likes: Number,
    reviews: Number,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
