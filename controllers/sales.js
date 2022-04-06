const SalesModel = require('../models/sales');
const SalesServices = require('../services/sales');

const getAll = async (req, res) => {
  try {
    const sales = await SalesModel.getAll();
    return res.status(200).json(sales).end();
  } catch (error) {
    return res.status(500).json({ message: 'Erro no Servidor' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const saleById = await SalesModel.getById(id);
    if (!saleById[0]) return res.status(404).json({ message: 'Sale not found' });
    return res.status(200).json(saleById);
  } catch (error) {
    res.status(500).json({ message: 'Erro' });
  }
};

const add = (req, res) => {
  try {
    const { body } = req;
    const itemsSold = [];
    body.forEach((e) => {
      const sale = SalesModel.add(e.productId, e.quantity);
      itemsSold.push(sale);
    });
    return res.status(201).json({ id: 1, itemsSold });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const result = { saleId: 1, itemUpdated: [] };
    const sale = await SalesServices.update(id, body[0].productId, body[0].quantity);
    result.itemUpdated.push(sale);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SalesServices.deleteById(id);
    if (result.message) return res.status(404).json({ message: 'Sale not found' }); 
    return res.status(204).end();
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