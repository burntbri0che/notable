const express = require("express");
const router = express.Router();

const noteController  = require("../../controllers/noteController");


router.post('/create', noteController.create);
router.post('/edit/:id', noteController.edit);

module.exports = router;