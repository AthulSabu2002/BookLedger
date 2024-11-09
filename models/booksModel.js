const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const copySchema = new Schema({
    copyId: {
        type: String,
        required: true,
        unique: true,  // Ensure that each copy has a unique ID
        trim: true
    },
    status: {
        type: String,
        enum: ['Available', 'Checked Out', 'Damaged', 'Lost'],
        default: 'Available'
    },
    condition: {
        type: String,
        enum: ['New', 'Used', 'Damaged'],
        default: 'New'
    }
}, { _id: false }); // _id is false because we're not creating individual IDs for copies

const bookSchema = new Schema({
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        unique: true,
        trim: true,
        match: [/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/, 'Please enter a valid ISBN']
    },
    title: {
        type: String,
        required: [true, 'Book title is required'],
        trim: true,
        index: true
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true,
        index: true
    },
    coAuthors: [{
        type: String,
        trim: true
    }],
    genre: {
        type: String,
        required: true,
        enum: ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'History', 
               'Biography', 'Children', 'Young Adult', 'Academic', 'Reference',
               'Poetry', 'Drama', 'Classic Literature'],
        index: true
    },
    subGenres: [{
        type: String,
        trim: true
    }],
    publisher: {
        type: String,
        required: true,
        trim: true
    },
    publicationYear: {
        type: Number,
        required: true,
        min: [1000, 'Publication year must be after 1000'],
        max: [new Date().getFullYear(), 'Publication year cannot be in the future']
    },
    edition: {
        type: String,
        trim: true
    },
    language: {
        type: String,
        required: true,
        default: 'English'
    },
    description: {
        type: String,
        trim: true,
        maxlength: [2000, 'Description cannot be longer than 2000 characters']
    },
    pageCount: {
        type: Number,
        min: [1, 'Page count must be at least 1']
    },
    copies: [copySchema],  // Array of copies with detailed schema
    metadata: {
        keywords: [{
            type: String,
            trim: true
        }],
        subjects: [{
            type: String,
            trim: true
        }],
        targetAudience: {
            type: String,
            default: 'All'
        }
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
