var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");

const {
  loginUser,
  renderAdminDashboard
} = require("../controllers/adminController");

const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.route("/dashboard").get(renderAdminDashboard);

router.route("/login").post(urlencodedParser, loginUser);

module.exports = router;
