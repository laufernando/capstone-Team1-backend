const express = require('express');
const router = express.Router();

//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the user controller to handle our user routes
const sizeController = require(
    `../persistence/${process.env.DB_PROTOCOL}/controllers/size.controller`
);

router.post("/", sizeController.createSize);
router.delete("/:id", sizeController.deleteSize);
router.get("/", sizeController.getSize);


module.exports = router;