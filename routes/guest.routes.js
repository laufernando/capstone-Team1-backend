const express = require('express');
const router = express.Router();

//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the user controller to handle our user routes
const guestController = require(
    `../persistence/${process.env.DB_PROTOCOL}/controllers/guest.controller`
);

//post route to create a user (user registration)
router.post("/", guestController.createGuest);
router.patch("/:id", guestController.updateGuest);
router.get("/:id", guestController.getGuestById);

module.exports = router;