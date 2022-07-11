
const products = require("../controllers/product.controller.js");
var router = require("express").Router();
// Create a new product
router.post("/", products.create);

// Retrieve a single Product with id
router.get("/all", products.findAll);

// get all product
router.get("/:id", products.findOne);
// Update a Product with id
router.put("/:id", products.update);

// Delete a Product with id
router.delete("/:id", products.delete);
module.exports = router;