const express = require("express");
const router = express.Router();

const {
  home,
  login,
  register,
  about,
  faq,
  registering,
  logging,
  auth,
  dashboard,
  isAuthenticated,
  logout,
} = require("../controller/contoller");

router.route("/").get(home);
router.route("/login").get(login).post(logging);
router.route("/register").get(register).post(registering);
router.route("/about").get(about);
router.route("/faq").get(faq);
router.route("/logout").get(logout);
router.route("/dashboard").get(dashboard);

module.exports = router;
