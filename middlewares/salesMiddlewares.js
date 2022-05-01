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

const validProductQuantity = async (req, res, next) => {
  const { body } = req;
  const products = await ProductsModel.getAll();
  const und = body.some((e) => e.quantity === undefined);
  
  if (und) return res.status(400).json({ message: '"quantity" is required' });
  const zero = body.some(({ quantity }) => quantity < 1);
  if (zero) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  const itens = [false];
  body.forEach(({ productId, quantity }) => {
    if (quantity > products.find((i) => i.id === productId).quantity) {
      itens.push(true);
    }  
  });
  if (itens.some((e) => e === true)) {
    return res.status(422).json({ message: 'Such amount is not permitted to sell' });
  }
  next();
};

module.exports = {
  validProductId,
  validProductQuantity,
};