const express = require("express");
const router = express.Router();


//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the user controller to handle our user routes
const sneakerController = require(`../persistence/${process.env.DB_PROTOCOL}/controllers/sneaker.controller`);

router.post("/", sneakerController.uploadFile);

module.exports = router;
