const express = require('express');

const SalesController = require('../controllers/sales');

const { validProductId, validProductQuantity } = require('../middlewares/salesMiddlewares');

const router = express.Router();

router
  .get('/', SalesController.getAll)
  .get('/:id', SalesController.getById)
  .post('/', validProductId, validProductQuantity, SalesController.add)
  .put('/:id', validProductId, validProductQuantity, SalesController.update);

module.exports = router;