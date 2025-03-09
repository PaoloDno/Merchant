const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/authorizationMiddleware');

const router = express.Router();

const { createSeller, getMyStore, updateMyStore, 
        deleteMyStore, adminDeleteSeller, adminVerifySeller, 
        viewStore 
      } = require('../controllers/sellerController');

router.get("/:id", viewStore);
router.post("/", authMiddleware, createSeller);
router.get("/", authMiddleware, getMyStore);
router.put("/", authMiddleware, updateMyStore);
router.delete("/:id", authMiddleware, deleteMyStore);
router.put("/admin/", authMiddleware, adminMiddleware, adminVerifySeller );
router.delete("/admin", authMiddleware, adminMiddleware, adminDeleteSeller);


module.exports = router;