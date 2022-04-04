const ProductModel = require('../models/products');

const add = async (name, quantity) => {
  try {
    const exist = await ProductModel.getByName(name);
    if (exist) {
      return { error: 404, message: 'Product already exists' };
    }

    const created = await ProductModel.add(name, quantity);
    return created;
  } catch (error) {
    return { error: 500, message: error };
  }
};

const update = async (id, name, quantity) => {
  try {
    const exist = await ProductModel.getById(id);
    if (!exist) return { error: 404, message: 'Product not found' };
    ProductModel.update(id, name, quantity);
    return { id, name, quantity };
  } catch (error) {
    return { error: 510, message: error.message };
  }
};

const deleteById = async (id) => {
  try {
    const exist = await ProductModel.getById(id);
    if (!exist) return { status: 404, message: 'Product not found' };
    ProductModel.deleteById(id);
    return { status: 204 };
  } catch (error) {
    return error;
  }
};

module.exports = {
  add,
  update,
  deleteById,
};