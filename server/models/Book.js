const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    isbn: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    likes: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
