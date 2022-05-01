const connection = require('./connection');

const getAllSales = `SELECT sale_id, product_id, quantity, date
FROM sales_products
JOIN sales ON  sales_products.sale_id = sales.id`;

const getPoduct = `SELECT date, product_id, quantity
FROM sales_products JOIN sales ON sales_products.sale_id = sales.id WHERE sale_id = ?`;

const insertSale = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
VALUES (?, ?, ?)`;

const serialize = (saleData) => ({
  saleId: saleData.sale_id,
  productId: saleData.product_id,
  quantity: saleData.quantity,
  date: saleData.date,
});

const getAll = async () => {
  const [sales] = await connection.execute(getAllSales);

  return sales.map(serialize);
};

const getById = async (id) => {
  const [sale] = await connection.execute(getPoduct, [id]);
  return sale.map(serialize);
};

const add = ({ productId, quantity }) => {
  const result = connection.execute(insertSale, [1, productId, quantity]);
  return result;
};

const update = async (id, productId, quantity) => {
  await connection.execute(`UPDATE sales_products
  SET product_id = ?, quantity = ? WHERE sale_id = ?`, [productId, quantity, id]);
  return { productId, quantity };
};

const deleteById = async (id) => {
  await connection.execute('DELETE FROM sales_products WHERE sale_id = ?', [id]);
  return {};
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  deleteById,
};
