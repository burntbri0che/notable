const router = require("express").Router();
const notes = require("../../controllers/noteController");

router.get("/", notes.getAll);
router.post("/create", notes.create);
router.put("/edit/:id", notes.edit);
router.delete("/delete/:id", notes.delete);

module.exports = router;
