const express = require("express");

const router = express.Router();
const { eventQuery, textQuery } = require("../controllers/dialogFlow");

router.post("/df_event_query", eventQuery);
router.post("/df_text_query", textQuery);

module.exports = router;
