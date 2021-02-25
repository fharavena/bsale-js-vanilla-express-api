const Category = require("./models/category.model");

module.exports = app => {
    const product = require("./controller/product.controller");
    const category = require("./controller/category.controller");

    app.get("/api/products/", product.findAll);
    app.get("/api/product/:text?", product.findProduct);
    app.get("/api/categories/", category.findAll);

};