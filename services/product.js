const ProductModel = require('../models/products');

const add = async (name, quantity) => {
  try {
    const exist = await ProductModel.getByName(name);
    if (exist[0]) {
      return { error: 409, message: 'Product already exists' };
    }

    const created = await ProductModel.add(name, quantity);
    return created;
  } catch (error) {
    return { error: 400, message: error };
  }
};

module.exports = {
  add,
};