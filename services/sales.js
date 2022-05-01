const SalesModel = require('../models/sales');

const update = async (id, productId, quantity) => {
  const sale = await SalesModel.update(id, productId, quantity);
  return sale;
};

const deleteById = async (id) => {
  try {
    const exist = await SalesModel.getById(id);
    if (exist[0] === undefined) return { status: 404, content: { message: 'Sale not found' } };
    await SalesModel.deleteById(id);
    return { status: 204 };
  } catch (error) {
    return error;
  }
};

const add = async (body) => {
  body.map((e) => SalesModel.add(e));
  return body;
};

module.exports = {
  update,
  deleteById,
  add,
};