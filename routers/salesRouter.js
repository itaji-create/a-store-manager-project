const express = require('express');

const SalesController = require('../controllers/sales');

const router = express.Router();

router
  .get('/', SalesController.getAll)
  .get('/:id', SalesController.getById)
  .post('/', SalesController.add)
  .put('/:id', SalesController.update);

module.exports = router;