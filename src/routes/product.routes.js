const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
    restoreProduct,
} = require("../controllers/product.controller");

const { protect } = require("../middlewares/auth.middleware");
const { adminOnly } = require("../middlewares/role.middleware");

// PUBLIC
router.get("/", getProducts);
router.get("/:id", getProductById);

// ADMIN ONLY
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);
router.patch(
  "/:id/restore",
  protect,
  adminOnly,
  restoreProduct
);

module.exports = router;
