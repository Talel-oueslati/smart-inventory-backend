const Product = require("../models/Product");
const AppError = require("../utils/AppError");

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Admin only
 */
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};



/**
 * @desc    Soft delete product
 * @route   DELETE /api/products/:id
 * @access  Admin only
 */
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Product soft-deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all products with pagination, search & advanced filters
 * @route   GET /api/products
 * @access  Public
 */
exports.getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const {
      search,
      category,
      minPrice,
      maxPrice,
    } = req.query;

    // 🔎 Build dynamic query
   const query = { isDeleted: false };


    // Search by name
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const totalResults = await Product.countDocuments(query);

    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      page,
      results: products.length,
      totalResults,
      totalPages: Math.ceil(totalResults / limit),
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Restore soft-deleted product
 * @route   PATCH /api/products/:id/restore
 * @access  Admin only
 */
exports.restoreProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isDeleted: false },
      { new: true }
    );

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Product restored successfully",
    });
  } catch (error) {
    next(error);
  }
};
exports.getDeletedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isDeleted: true });

    res.status(200).json({
      status: "success",
      results: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
exports.getProductById = async (req, res, next) => {
  try {
const product = await Product.findOne({
  _id: req.params.id,
  isDeleted: false,
});
    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Admin only
 */
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Admin only
 */
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
