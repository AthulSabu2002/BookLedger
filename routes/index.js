var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");

const {
  registerUser,
  loginUser
} = require("../controllers/userController");

const urlencodedParser = bodyParser.urlencoded({ extended: true });


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/dashboard', function(req, res, next) {
  res.render('userDashboard');
});


router.route("/register").post(urlencodedParser, registerUser);

router.route("/login").post(urlencodedParser, loginUser);

module.exports = router;
