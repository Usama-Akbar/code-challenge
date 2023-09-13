var express = require("express");
var router = express.Router();
require("dotenv").config();

const sectorController = require("../controllers/sectorController");

router.get("/list", sectorController.listSector);
router.post("/add", sectorController.addSector);
router.put("/update/:id", sectorController.updateSector);
router.get("/get/:id", sectorController.getSector);
router.delete("/delete/:id", sectorController.deleteSector);

module.exports = router;
