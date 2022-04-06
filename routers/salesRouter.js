const express = require('express');

const SalesController = require('../controllers/sales');

const { validProductId, validProductQuantity } = require('../middlewares/salesMiddlewares');

const router = express.Router();

router
  .get('/', SalesController.getAll)
  .get('/:id', SalesController.getById)
  .post('/', validProductId, validProductQuantity, SalesController.add)
  .put('/:id', validProductId, validProductQuantity, SalesController.update)
  .delete('/:id', SalesController.deleteById);

module.exports = router;