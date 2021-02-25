const Category = require("../models/category.model");

// Retrieve all categories from the database.
exports.findAll = (req, res) => {
    Category.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving categories."
            });
        else res.send(data);
    });
};