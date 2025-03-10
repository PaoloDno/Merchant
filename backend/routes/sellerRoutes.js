const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/authorizationMiddleware');


const { createStore, getMyStore, updateMyStore, 
  deleteMyStore, adminDeleteStore, adminVerifyStore, 
  viewStore 
} = require('../controllers/sellerController');

const router = express.Router();


router.get("/:id", viewStore);
router.post("/", authMiddleware, createStore);
router.get("/", authMiddleware, getMyStore);
router.put("/", authMiddleware, updateMyStore);
router.delete("/:id", authMiddleware, deleteMyStore);
router.put("/admin/:id", authMiddleware, adminMiddleware, adminVerifyStore );
router.delete("/admin/:id", authMiddleware, adminMiddleware, adminDeleteStore);


module.exports = router;

//store