const connection = require('./connection');

const insertProduct = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)';

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const getById = async (id) => {
  const [products] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return products;
};

const add = async (name, quantity) => {
  const [{ insertId }] = await connection.execute(insertProduct, [name, quantity]);
  return {
    id: insertId,
    name,
    quantity,
  };
};

const getByName = async (name) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE name = ?', [name]);
  return product;
};

module.exports = {
  getAll,
  getById,
  add,
  getByName,
};
