const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports.register = async (req, res) => {
    const { username, password, email } = req.body;
    const user = new User({
        username,
        password,
        email,
    });

    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    try {
        await user.save();
        res.status(201).send("User created: " + user.username);
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports.login = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("User not found");

    const matchedPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!matchedPassword) return res.status(400).send("Invalid password");

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.header("auth-token", token).send("login successful").status(200);
};
