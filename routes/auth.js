const express = require("express");
const { signupValidator } = require("../validators/signup.validator");
const { validate } = require("../validators/validate");
const authController = require("../controller/auth");
const router = express.Router();

router.post("/signup", signupValidator, validate, authController.signup);

module.exports = router;
