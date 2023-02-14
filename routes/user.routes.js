const express = require('express');
const router = express.Router();

//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the user controller to handle our user routes
const userController = require(
    `../persistence/${process.env.DB_PROTOCOL}/controllers/user.controller`
)

//post route to create a user (user registration)
router.post("/", userController.createUser)

//get route to return all users (requires auth)
router.get("/", userController.getUsers)

//get route to return a specific users (requires auth)
router.get("/:email", validateJwtMiddleware, userController.getUser)

//put route to update a user (requires auth)
router.put("/:email", validateJwtMiddleware, userController.updateUser)

module.exports = router;
