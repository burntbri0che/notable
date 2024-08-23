const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./routes/api/auth");
app.use(bodyParser.json());

mongoose
    .connect("mongodb://localhost:27017/notable", {})
    .then((result) => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log(err);
    });

app.use("/api/auth", router);
app.get("/", (req, res) => {
    res.send("Notable");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
