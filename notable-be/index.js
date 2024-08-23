const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./routes/api/auth");
const dotenv = require("dotenv");
const jwtAuth = require("./middlewares/jwtAuth");

app.use(bodyParser.json());

dotenv.config();

mongoose
    .connect("mongodb://localhost:27017/notable", {})
    .then((result) => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log(err);
    });

app.use("/api/auth", router);
app.get("/", jwtAuth, (req, res) => {
    res.send("Notable and user is: " + req.user.username);
});

PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
