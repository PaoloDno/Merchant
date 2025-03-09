const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { processOrder, getOrderHistoryUser, getOrderById, getAllOrders } = require("../controllers/checkOutController");
const adminMiddleware = require("../middlewares/authorizationMiddleware");

const router = express.Router();

router.post("/checkout", authMiddleware, processOrder);
router.get("/", authMiddleware, getOrderHistoryUser);
router.get("/:id", authMiddleware, getOrderById);
router.get("/all", authMiddleware, adminMiddleware, getAllOrders);

module.exports = router;
