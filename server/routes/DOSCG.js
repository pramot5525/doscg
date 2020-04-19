var express = require("express");
var router = express.Router();
var controller = require("../controllers/DOSCG");

router.get("/", function (req, res) {
  res.render("index", { title: "Hey", message: "Hello there!" });
});

router.get("/xyz", controller.findXYZ);
router.get("/findBC", controller.findBC);
router.get("/map", controller.connectGoogleAPI);

module.exports = router;
