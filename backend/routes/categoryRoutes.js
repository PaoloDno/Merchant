const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/authorizationMiddleware');

const router = express.Router();

const { createCategory, createSubCategory, updateCategory, updateSubCategory,
        getAllCategories, getAllSubCategories, getProductByCategoryId, getProductsBySubCategoryId,
        deleteCategory, deleteSubCategory
      } = require("../controllers/categoryController");

router.post("/", authMiddleware, createCategory), //admin
router.put("/:id", authMiddleware, adminMiddleware, updateCategory),
router.delete("/:id", authMiddleware, adminMiddleware, deleteCategory),

//sub
router.post("/sub", authMiddleware, createSubCategory ); //admin
router.put("/sub/:id", authMiddleware, adminMiddleware, updateSubCategory );
router.delete("/sub/:id", authMiddleware, adminMiddleware, deleteSubCategory );

//getall
router.get("/all", authMiddleware, adminMiddleware, getAllCategories),
router.get("/sub/all", authMiddleware, adminMiddleware, getAllSubCategories);

//get Product
router.get("/products/:id", authMiddleware, adminMiddleware, getProductByCategoryId),
router.get("/products/sub/:id", authMiddleware, adminMiddleware, getProductsBySubCategoryId );

module.exports = router;