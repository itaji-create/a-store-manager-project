const connection = require('./connection');

const getAllProducts = `SELECT sale_id, product_id, quantity, date
FROM sales_products
JOIN sales ON  sales_products.sale_id = sales.id`;
const getPoduct = `SELECT date, product_id, quantity
FROM sales_products JOIN sales ON sales_products.sale_id = sales.id WHERE sale_id = ?`;

const serialize = (saleData) => ({
  saleId: saleData.sale_id,
  productId: saleData.product_id,
  quantity: saleData.quantity,
  date: saleData.date,
});

const getAll = async () => {
  const [sales] = await connection.execute(getAllProducts);

  return sales.map(serialize);
};

const getById = async (id) => {
  const [sale] = await connection.execute(getPoduct, [id]);
  return sale.map(serialize);
};

module.exports = {
  getAll,
  getById,
};
