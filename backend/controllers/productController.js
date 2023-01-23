const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const CatchAsyncError = require('../middlewares/catchAsyncError');
const APIFeatures = require('../utils/apiFeature');
const catchAsyncError = require('../middlewares/catchAsyncError');
const { query } = require('express');
const cloudinary = require('cloudinary')

exports.newProduct = CatchAsyncError(async (req, res, next) => {

  let images = []
    if (typeof req.body.images === 'string') {
      images.push(req.body.images)
      console.log("true")
    } else {
      images = req.body.images
      console.log("true  second")
    }

    let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
      console.log(i, "integer")
        let result = await cloudinary.v2.uploader.upload(images[i]);
       
        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

  req.body.images = imagesLinks
  req.body.user = req.user.id // add user to request body

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product
})
});
//  get all products => /api/v1/products
exports.getProducts = CatchAsyncError(async (req, res, next) => {
  const resPerPage = 4;
   console.log(req,"best")
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  const products = await apiFeatures.query;
  
  const productsCount = await Product.countDocuments()
  
    res.status(200).json({ 
      status: true,
      productsCount,
      products,
      resPerPage
    });


});

// get single product details => /api/v1/products/:id

exports.productDetails = CatchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('No product found', 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

exports.updateProduct = CatchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
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

exports.deleteProduct = CatchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: 'Product deleted successfuly',
  });
});

// Create new review   =>   /api/v1/review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  
  const { rating, comment, productId } = req.body
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  }
  const product = await Product.findById(productId)
  const isReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
  //update existing product review
  if (isReviewed) {
product.reviews.forEach(review => {
  if (review.user.toString() === req.user._id.toString()) {
    review.comment = comment
    review.rating = rating
  }
});
  }
  //create new review
  else {
    product.reviews.push(review)
    product.  numOfReviews = product.reviews.length
  }
  //Update total rating for product
  product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true
})
})
// Get Product Reviews   =>   /api/v1/reviews
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id)

  res.status(200).json({
    success: true, 
    reviews:product.reviews
  })
})

// Delete Product Review   =>   /api/v1/reviews
exports.deleteProductReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id)
 
  // drop review
  const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())
  const numOfReviews = reviews.length
  //  calculate product  total rating
  const ratings = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
  // find product and update its reviews
  await Product.findOneAndUpdate(req.query.productId, {
    reviews,
    ratings,
    numOfReviews
  }, {
    new: true,
  runValidators: true,
    useFindAndModify: false
  })
  
  res.status(200).json({
    success: true
})
})


//  get all products => /api/v1/admin/products
exports.getAdminProducts = CatchAsyncError(async (req, res, next) => {


   console.log(req, "best")
  const products= await Product.find()
console.log(products, "pro")
    res.status(200).json({ 
      status: true,
      products,
    
    });

});
