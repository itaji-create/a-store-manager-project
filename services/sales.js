const SalesModel = require('../models/sales');

const update = async (id, productId, quantity) => {
  const sale = await SalesModel.update(id, productId, quantity);
  return sale;
};

module.exports = {
  update,
};