module.exports = async function (req, res, next) {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
};
