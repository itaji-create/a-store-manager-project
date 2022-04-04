const { expect } = require('chai');
const ProductController = require('../../../controllers/products');
const ProductService = require('../../../services/product');
const sinon = require('sinon');

describe("Products Controller", () => {
  describe('', () => {
  })
  const fakeProduct = [{
    id: 1,
    name: 'produto A',
    quantity: 10
  }];

  const response = {};
  const request = {};

  before(() => {
    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns(response);
  })

})