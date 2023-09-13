var express = require("express");
var router = express.Router();
require("dotenv").config();

const listController = require("../controllers/listController");

router.get("/sector", listController.sectorList);

module.exports = router;
