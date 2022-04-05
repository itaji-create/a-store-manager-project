const validProductId = (req, res, next) => {
  const { productId } = req.body[0];
  if (!productId) return res.status(400).json({ message: '"productId" is required' });
  next();
};

const validProductQuantity = (req, res, next) => {
  const { quantity } = req.body[0];
  if (quantity === undefined) return res.status(400).json({ message: '"quantity" is required' });
  if (quantity < 1) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = {
  validProductId,
  validProductQuantity,
};