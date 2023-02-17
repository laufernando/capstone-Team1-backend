const express = require('express');
const router = express.Router();

//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the user controller to handle our user routes
const genderController = require(
    `../persistence/${process.env.DB_PROTOCOL}/controllers/gender.controller`
);

//post route to create a user (user registration)
router.post("/", genderController.createGender);
//router.get("/:id", genderController.getGenderById);
router.delete("/:id", genderController.deleteGender);
router.get("/", genderController.getGender);


module.exports = router;