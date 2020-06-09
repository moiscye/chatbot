const express = require("express");

const router = express.Router();

const { fulfillment } = require("../controllers/fulfullment");

router.post("/fulfillment", fulfillment);

module.exports = router;
