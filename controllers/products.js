const ProductModel = require('../models/products');

const getAll = async (req, res) => {
  try {
    const products = await ProductModel.getAll();
    return res.status(201).json(products).end();
  } catch (error) {
    return res.status(500).json({ message: 'Erro no Servidor' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const productById = await ProductModel.getById(id);
    return res.status(201).json(productById);
  } catch (error) {
    res.status(500).json({ message: 'Erro' });
  }
};

module.exports = {
  getAll,
  getById,
};