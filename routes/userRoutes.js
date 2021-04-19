const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController");

router.get("/login", userController.getForm);
router.post("/login", userController.getRegDetails);


module.exports= {
    router,
}