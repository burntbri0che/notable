const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const auth = require("./routes/api/auth");
const notes = require("./routes/api/notes");
const dotenv = require("dotenv");
const jwtAuth = require("./middlewares/jwtAuth");
const logger = require("./middlewares/requestLogging");

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

app.use(
    cors({
        exposedHeaders: ["auth-token"], // Allow frontend to access the auth-token header
    })
);

app.use(logger);

app.use("/api/auth", auth);
app.get("/", (req, res) => {
    res.send("Notable and user is: ");
});

app.use("/api/notes", jwtAuth, notes);

PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
