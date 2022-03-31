const SalesModel = require('../models/sales');

const getAll = async (req, res) => {
  try {
      const sales = await SalesModel.getAll();
      return res.status(200).json(sales).end();
  } catch (error) {
      return res.status(500).json({ message: 'Erro no Servidor' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
      const saleById = await SalesModel.getById(id);
      if (!saleById[0]) return res.status(404).json({ message: 'Sale not found' });
      return res.status(200).json(saleById);
  } catch (error) {
      res.status(500).json({ message: 'Erro' });
  }
};

const add = (req, res) => {
  const { body } = req;
  const itemsSold = [];
  body.forEach((e) => {
    const sale = SalesModel.add(e.productId, e.quantity);
    itemsSold.push(sale);
  });
  return res.status(201).json({ id: 1, itemsSold });
};

module.exports = {
    getAll,
    getById,
    add,
};