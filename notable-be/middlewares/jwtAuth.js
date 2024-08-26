let jwt = require("jsonwebtoken");
let user = require("../models/user");

module.exports = async function (req, res, next) {
    try {
        const token = req.header("auth-token");
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log(verified);
        if (verified) {
            req.user = await user.findById(verified._id);
            next();
        } else {
            res.status(400).send("Invalid token");
        }
    } catch (err) {
        res.status(400).send("Invalid token");
    }
};
