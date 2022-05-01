const ProductsModel = require('../models/products');

const validProductId = (req, res, next) => {
  const { body } = req;
  const und = body.some(({ productId }) => productId === '');
  if (und) return res.status(400).json({ message: '"productId" is required' });
  
  const zero = body.some(({ productId }) => productId < 1);
  if (zero) {
    return res.status(422).json({ message: '"productId" must be greater than or equal to 1' });
  }    
  next();
};

const validProductQuantity = async (req, res, next) => {
  const { body } = req;
  const products = await ProductsModel.getAll();
  const und = body.some(({ quantity }) => quantity === '');
  if (und) return res.status(400).json({ message: '"quantity" is required' });
  
  const zero = body.some(({ quantity }) => quantity < 1);
  if (zero) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  } 
   
  body.forEach(({ productId, quantity }) => {
    const product = products.find((i) => i.id === productId);
    if (quantity > product.quantity) {
      return res.status(422).json({ message: 'Such amount is not permitted to sell' });
    }  
  });

  next();
};

module.exports = {
  validProductId,
  validProductQuantity,
};