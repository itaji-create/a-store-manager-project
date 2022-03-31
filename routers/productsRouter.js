const express = require('express');

const ProductsController = require('../controllers/products');
const {
  validProductName,
  validProductQuantity,
} = require('../middlewares/productsMiddleware');

const router = express.Router();

router
  .get('/', ProductsController.getAll)
  .get('/:id', ProductsController.getById)
  .post('/', validProductName, validProductQuantity, ProductsController.add)
  .put('/:id', ProductsController.update)
  .delete('/:id', ProductsController.deleteById);

module.exports = router;