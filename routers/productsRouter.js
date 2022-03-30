const express = require('express');

const ProductsController = require('../controllers/products');

const router = express.Router();

router
  .get('/', ProductsController.getAll)
  .get('/:id', ProductsController.getById);

module.exports = router;