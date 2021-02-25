const sql = require("../config/db");

const Category = function(category) {
    this.id = product.id;
    this.name = product.name;
};

Category.getAll = (result) => {
    sql.query('SELECT * FROM category', function(err, rows) {
        if (err) {
            result(err, null);
        } else {
            result(null, rows);
        }
    });
};

module.exports = Category;