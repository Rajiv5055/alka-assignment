const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

const path = require('path');
const util = require('util');

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});