const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Book = require('../models/booksModel');
const Category = require('../models/categoryModel');

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: 'Username and password fields are mandatory',
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      console.log('No user found with this username:', username);
      return res.status(401).json({
        message: 'Incorrect username or password',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Incorrect password for user:', username);
      return res.status(401).json({
        message: 'Incorrect username or password',
      });
    }

    req.login(user, (err) => {
      if (err) {
        console.error('Error logging in:', err);
        return res.status(500).json({
          message: 'Internal server error',
        });
      }

      req.session.loggedIn = true;
      const userId = req.user.id;

      res.cookie('userId', userId, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      const returnUrl = req.cookies.returnTo || '/users/dashboard';
      res.clearCookie('returnTo');
      return res.status(200).json({
        message: 'Login successful',
        redirectUrl: returnUrl,
      });
    });
  } catch (error) {
    console.error('Error finding user:', error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

const renderAdminDashboard = asyncHandler(async (req, res) => {
    try {
        const books = await Book.find();
        res.render('adminDashboard', {books, activeTab: 'Books' });
    } catch (error) {
        
    }
});


const renderInventory = asyncHandler(async (req, res) => {
    try {
        const books = await Book.find();

        res.render('inventory', {books});
    } catch (error) {
        
    }
});


const add_book = asyncHandler(async (req, res) => {
    try {
          const {
                isbn, title, author, coAuthors, genre, subGenres, publisher, publicationYear,
                edition, language, description, pageCount, metadata, numberOfCopies
          } = req.body;


        const copies = Array.from({ length: numberOfCopies }, (_, i) => ({
            copyId: `${isbn}-${i + 1}`,
            status: 'Available',
            condition: 'New'
        }));


        const newBook = new Book({
            isbn,
            title,
            author,
            coAuthors: coAuthors ? coAuthors.split(',').map(coAuthor => coAuthor.trim()) : [],
            genre,
            subGenres: subGenres ? subGenres.split(',').map(subGenre => subGenre.trim()) : [],
            publisher,
            publicationYear,
            edition,
            language,
            description,
            pageCount,
            metadata,
            copies
        });


        await newBook.save();
        res.status(201).send('Book added successfully');
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).send('Failed to add book');
    }
});

const update_book = asyncHandler(async (req, res) => {
    try {
        console.log(req.body);

    } catch (error) {
      console.log(error);
    }
});


const add_category = asyncHandler(async (req, res) => {
    try {
        const { categoryName, description } = req.body;

        if (!categoryName) {
            return res.status(400).json({
                success: false,
                message: 'Category name is required'
            });
        }

        const existingCategory = await Category.findOne({ name: categoryName });
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category already exists'
            });
        }

        const category = await Category.create({
            name: categoryName,
            description: description || ''
        });

        res.status(201).json({
            success: true,
            message: 'Category added successfully!',
            category
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while adding the category.'
        });
    }
});


module.exports = {
  loginUser,
  renderAdminDashboard,
  renderInventory,
  add_book,
  update_book,
  add_category
};
