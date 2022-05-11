const ProductsModel = require('../models/products');

const validProductId = (req, res, next) => {
  const { body } = req;
  const und = body.some((e) => e.productId === undefined);
  if (und) return res.status(400).json({ message: '"productId" is required' });
  
  const zero = body.some(({ productId }) => productId < 1);
  if (zero) {
    return res.status(422).json({ message: '"productId" must be greater than or equal to 1' });
  }    
  next();
};

const validProductQuantity = (req, res, next) => {
  const { body } = req;

  const und = body.some((e) => e.quantity === undefined);  
  if (und) return res.status(400).json({ message: '"quantity" is required' });
  
  const zero = body.some(({ quantity }) => quantity < 1);
  if (zero) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const validQuantityAmount = async (req, res, next) => {
  const { body } = req;

  const products = await ProductsModel.getAll();
  body.forEach(({ productId, quantity }) => {
    const quantityUnavailable = quantity > products.find((i) => i.id === productId).quantity;
    if (quantityUnavailable) {
      return res.status(422).json({ message: 'Such amount is not permitted to sell' });
    }  
  });
  next();
};

module.exports = {
  validProductId,
  validProductQuantity,
  validQuantityAmount,
};