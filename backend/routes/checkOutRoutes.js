const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { processOrder } = require("../controllers/checkOutController");

const router = express.Router();

router.post("/checkout", authMiddleware, processOrder);

module.exports = router;
