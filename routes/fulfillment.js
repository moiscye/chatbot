const express = require("express");

const router = express.Router();

const { fulfillment } = require("../controllers/fulfillment");

router.post("/fulfillment", fulfillment);

module.exports = router;
