const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true,
    maxLength: [100, 'Product name should not be exceed 10 character!'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
    maxLength: [5, 'Product price should not exceed five digits'],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, 'Please enter product descripion'],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        url: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'Please enter product category'],
    enum: {
      values: [
        'Electronics',
        'Cameras',
        'Laptop',
        'Accessories',
        'Headphones',
        'Books',
        'Foods',
        'Beauty/Health',
        'Cloths/Shoes',
        'Sports',
        'Outdoors',
        'Home',
      ],
      message: 'Please select product category',
    },
  },
  seller: {
    type: String,
    required: [true, 'Please enter product seller'],
  },
  stock: {
    type: Number,
    required: [true, 'Please entr product stock'],
    maxLength: [5, 'Product stock can not be exceed five digits'],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required:true
  },
  createDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Product', productSchema);
