var express = require('express');
var router = express.Router();

const {
  loginUser,
  renderAdminDashboard,
  renderInventory,
  add_book,
  update_book,
  add_category
} = require("../controllers/adminController");

const urlencodedParser = express.urlencoded({ extended: true });
const jsonParser = express.json();

router.get('/login', function(req, res, next) {
  res.render('adminLogin');
});

router.route("/login").post(urlencodedParser, loginUser);

router.route("/dashboard").get(renderAdminDashboard);

router.route("/inventory").get(renderInventory);

router.route("/add-book").post(urlencodedParser, add_book);

router.route("/update-book").post(urlencodedParser, update_book);

router.route("/add-category").post(jsonParser, add_category);

module.exports = router;
