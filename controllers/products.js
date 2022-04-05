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
  try {
    const { id } = req.params;
    const productById = await ProductModel.getById(id);
    if (!productById[0]) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(productById[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erro' });
  }
};

const add = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = await ProductService.add(name, quantity);
    if (product.error) return res.status(409).json(product);
    return res.status(201).json(product);
  } catch (error) {
    return error;
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await ProductService.update(id, name, quantity);
    if (product.error) return res.status(product.error).json(product);
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductService.deleteById(id);
    return res.status(product.status).json(product);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  deleteById,
};