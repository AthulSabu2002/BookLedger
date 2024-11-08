const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');


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
        const books = [];
        res.render('adminDashboard', {books});
    } catch (error) {
        
    }
});

module.exports = {
  loginUser,
  renderAdminDashboard
};
