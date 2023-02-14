const express = require('express');
const router = express.Router();

//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the user controller to handle our user routes
const sneakerController = require(
    `../persistence/${process.env.DB_PROTOCOL}/controllers/sneaker.controller`
)

//get route to return all users (requires auth)
router.get("/", sneakerController.getSneaker)

//post route to create a user (user registration)
router.post("/", sneakerController.createSneaker)

module.exports = router;
