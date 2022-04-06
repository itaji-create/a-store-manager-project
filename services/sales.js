const SalesModel = require('../models/sales');

const update = async (id, productId, quantity) => {
  const sale = await SalesModel.update(id, productId, quantity);
  return sale;
};

const deleteById = async (id) => {
  try {
    const exist = await SalesModel.getById(id);
    console.log(exist[0]);
    if (exist[0] === undefined) return { status: 404, content: { message: 'Sale not found' } };
    SalesModel.deleteById(id);
    return { status: 204, content: '' };
  } catch (error) {
    return error;
  }
};

module.exports = {
  update,
  deleteById,
};