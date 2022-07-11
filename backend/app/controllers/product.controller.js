const db = require("../models");
const BusBoyRequestFormatter = require("../shared/service/busBodReqFormatter");
const Products = db.products;
const Op = db.Sequelize.Op;
const errorMsg = "Oops something went wrong, Please contact administrator.";
exports.create = async (req, res) => {
  try {
    var body = req.body;
    console.log("Inside create Product:", body);
    // Validate request
    if (!body) {
      res.status(400).send({
        message: "Invalid request body"
      });
      return;
    }
    // Create a Product object
    const Product = {
      title: body.title,
      description: body.description,
      photo: body.image,
      price: body.price
    };
    console.log(body);
    //check any product with title
    var isProdWithTitle = await Products.findOne({ where: { title: body.title } });
    if (isProdWithTitle) {
      res.status(200).send({ status: 409, msg: "Product with title '" + body.title + "' already exists!" });
    } else {
      // Save Product in the database
      var data = await Products.create(body);
      console.log("Product created successfully");
      res.status(200).send({ status: 200, msg: "Product created successfully" });
    }

  }
  catch (err) {
    console.log("Error occured inside create product", err.message);
    res.status(500).send({
      msg:
        errorMsg
    });
  };
};

// Retrieve all Products from the database.
exports.findAll = async (req, res) => {
  try {
    console.log("Inside get all Product:", req.body);
    var filter = { status: "A" }
    var data = await Products.findAll({ where: filter });
    res.status(200).send({ status: 200, msg: "Products found successfully", data: data });
  } catch (err) {
    console.log("Error occured inside find all product", err.message);
    res.status(500).send({
      msg:
        errorMsg
    });
  }
};

// Find a single Product with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Inside find one Product by id: ${id}`);
    var data = await Products.findOne({ where: { id: id, status: "A" } });
    if (data) {
      res.status(200).send({ status: 200, msg: "Product found successfully", data: data });
    } else {
      console.log(`Product not found with id:${id}`);
      res.status(404).send({
        msg: `Product not found`
      });
    }
  }
  catch (err) {
    console.log("Error occured inside find all product", err.message);
    res.status(500).send({
      msg: "Error retrieving Product with id=" + id
    });
  };
};

// Update a Product by the id in the request
exports.update = async (req, res) => {
  try {
    console.log("Inside product update with body: ", req.body);
    const id = req.params.id;
    var data = await Products.update(req.body, {
      where: { id: id }
    })
    console.log("data", data);
    if (data) {
      console.log(`Product updated successfully`);
      res.status(200).send({
        msg: "Products was updated successfully."
      });
    } else {
      console.log(`Unable to Product update`);
      res.status(500).send({
        msg: `Cannot update Product!`
      });
    }
  } catch (err) {
    console.log("Error occured inside update product", err.message);
    res.status(500).send({
      msg: "Error updating Product"
    });
  };
};

// Delete a Products with the specified id in the request
exports.delete = async (req, res) => {
  try {
    var productId = req.params.id;
    console.log("Inside product delete by id:", productId);
    const id = productId;
    var data = Products.update(
      { status: 'D' },
      { where: { id: id } }
    );
    if (data) {
      console.log("Inside product delete by id:", productId);
      res.status(200).send({
        msg: "Products was deleted successfully!"
      });
    } else {
      console.log(`Cannot delete Products with id=${id}. Maybe Products was not found!`);
      res.status(500).send({
        msg: `Cannot delete Product. Product was not found!`
      });
    }
  } catch (err) {
    console.log("Error occured inside delete product", err.message);
    res.status(500).send({
      msg: errorMsg
    });
  };
};
