const express = require('express');
const router = express.Router();

//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the user controller to handle our user routes
const mailController = require(
    `../persistence/${process.env.DB_PROTOCOL}/controllers/mail.controller`
);

router.post("/", mailController.sedMessage);


module.exports = router;