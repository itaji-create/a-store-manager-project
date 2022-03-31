const ProductModel = require('../models/products');
const ProductService = require('../services/product');

const getAll = async (req, res) => {
  try {
    const products = await ProductModel.getAll();
    return res.status(200).json(products).end();
  } catch (error) {
    return res.status(500).json({ message: 'Erro no Servidor' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const productById = await ProductModel.getById(id);
    if (!productById[0]) return res.status(404).json({ message: 'Product not found' });
    return res.status(201).json(productById[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erro' });
  }
};

const add = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const product = await ProductService.add(name, quantity);
    if (product.error) return res.status(409).json(product);
    return res.status(201).json(product);
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAll,
  getById,
  add,
};