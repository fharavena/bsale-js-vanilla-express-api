require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});

app.get("/", (req, res) => {
    res.json({ message: "API productos." });
});

require("./app/product.routes")(app);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000.");
});