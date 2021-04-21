const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/login", userController.getForm);

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);

module.exports = {
  router,
};
