const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/authorizationMiddleware');

const { createCategory, createSubCategory, updateCategory, updateSubCategory,
        getAllCategories, getAllSubCategories, getProductByCategoryId, getProductsBySubCategoryId,
        deleteCategory, deleteSubCategory
      } = require("../controllers/categoryController");

router.post("/", authMiddleware, adminMiddleware, createCategory),
router.post("/sub", authMiddleware, adminMiddleware, createSubCategory );
router.put("/:id", authMiddleware, adminMiddleware, updateCategory),
router.put("/sub/:id", authMiddleware, adminMiddleware, updateSubCategory );
router.delete("/:id", authMiddleware, adminMiddleware, deleteCategory),
router.delete("/sub/:id", authMiddleware, adminMiddleware, deleteSubCategory );


router.get("/:id", authMiddleware, adminMiddleware, getAllCategories),
router.get("/sub/:id", authMiddleware, adminMiddleware, getAllSubCategories);

//get Product
router.get("/products/:id", authMiddleware, adminMiddleware, getProductByCategoryId),
router.get("/products/sub/:id", authMiddleware, adminMiddleware, getProductsBySubCategoryId );
