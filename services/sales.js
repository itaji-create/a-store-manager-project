const SalesModel = require('../models/sales');

const update = async (id, productId, quantity) => {
  const sale = await SalesModel.update(id, productId, quantity);
  return sale;
};

const deleteById = async (id) => {
  const exist = await SalesModel.getById(id);
  if (exist[0] === undefined) {
    return { message: 'Sale not found' };
  }
  await SalesModel.deleteById(id);
  return {};
};

module.exports = {
  update,
  deleteById,
};