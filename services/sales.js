const SalesModel = require('../models/sales');
const ProductServices = require('./product');
const ProductModel = require('../models/products');

const update = async (id, productId, quantity) => {
  const sale = await SalesModel.update(id, productId, quantity);
  return sale;
};

const deleteById = async (id) => {
  try {
    const sales = await SalesModel.getById(id);
    if (sales[0] === undefined) return { status: 404, content: { message: 'Sale not found' } };
    sales.forEach(async (e) => {
      const [product] = await ProductModel.getById(e.productId);
      const restoreQtd = product.quantity + e.quantity;
      ProductServices.update(e.productId, product.name, restoreQtd);
    });
    await SalesModel.deleteById(id);
    return { status: 204 };
  } catch (error) {
    return error;
  }
};

const add = async (body) => {
  body.forEach(async (e) => {
    const [product] = await ProductModel.getById(e.productId);
    SalesModel.add(e);
    const sub = product.quantity - e.quantity;
    ProductServices.update(e.productId, product.name, sub);
  });
};

module.exports = {
  update,
  deleteById,
  add,
};