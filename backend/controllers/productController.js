exports.getProducts = (req, res, next) => {
  res.status(200).json({
    status: true,
    message: 'This route shows all products in the database',
  });
};
