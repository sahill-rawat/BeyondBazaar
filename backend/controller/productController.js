const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).send({
    sucess: true,
    product,
  });
});

exports.updateProduct = catchAsyncErrors(async (req, res) => {
  let product = Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

exports.getAllProduct = catchAsyncErrors(async (req, res) => {
  const productPerPage = 6;
  const productCount = await Product.countDocuments();
  const ApiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(productPerPage);
  const products = await ApiFeature.query;
  res.status(201).json({
    sucess: true,
    products,
    productCount,
    productPerPage
  });
});

exports.deleteProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully!",
  });
});

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { productId, rating, comment } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment: comment,
  };

  const product = await Product.findById(productId);
  
  if (!product) return next(new ErrorHander("Product not found", 404));

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  let len = product.reviews.length;

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.rating = rating;
        review.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = ++len;
  }

  let sum = 0;
  product.reviews.forEach((review) => (sum += review.rating));
  product.ratings = sum / len;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    product,
  });
});

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) return next(new ErrorHander("Product not found", 404));

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const { user, productId } = req.body;
  let product = await Product.findById(productId);

  if (!product) return next(new ErrorHander("Product not found", 404));

  const reviews = product.reviews.filter(
    (review) => review.user.toString() !== user.toString()
  );

  let sum = 0,
    len = 0;
  reviews.forEach((review) => ((sum += review.rating), len++));

  await Product.findByIdAndUpdate(productId, {
    reviews: reviews,
    ratings: sum / len,
    numOfReviews: len,
  });

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
