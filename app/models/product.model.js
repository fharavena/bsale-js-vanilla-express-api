const sql = require("../config/db");

// constructor
const Product = function(product) {
    this.id = product.id;
    this.name = product.name;
    this.url_image = product.url_image;
    this.price = product.price;
    this.discount = product.discount;
    this.category = product.category;
};

Product.findByName = (ProductName, result) => {
    if (ProductName === undefined) {
        sql.query(`SELECT * FROM product`, (err, rows) => {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, rows);
            }
        });
    } else {

        sql.query(`SELECT * FROM product WHERE name like '%${ProductName}%'`, (err, rows) => {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, rows);
            }
        });
    }

};

Product.getAll = (result) => {
    var page = 1;
    var numPerPage = 1;
    var skip = (page - 1) * numPerPage;
    var limit = skip + ',' + numPerPage;
    sql.query('SELECT count(*) as numRows FROM product', function(err, rows) {
        if (err) {
            result(err, null);
        } else {
            var numRows = rows[0].numRows;
            var numPages = Math.ceil(numRows / numPerPage);
            sql.query('SELECT * FROM product LIMIT ' + limit, function(err, rows) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, rows, numPages);
                }
            });
        }
    });
};

module.exports = Product;