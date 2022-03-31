const ProductModel = require('../models/products');

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
    return res.status(200).json(productById[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erro' });
  }
};

module.exports = {
  getAll,
  getById,
};