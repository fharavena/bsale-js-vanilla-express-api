const Product = require("../models/product.model");

// Retrieve all products from the database.
exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products."
            });
        else res.send(data);
    });
};

exports.findProduct = (req, res) => {
    Product.findByName(req.params.text, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found product with name ${req.params.text}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving product with name " + req.params.text
                });
            }
        } else res.send(data);
    });
};