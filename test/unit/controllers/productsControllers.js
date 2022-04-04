const { expect } = require('chai');
const ProductController = require('../../../controllers/products');
const ProductService = require('../../../services/product');
const sinon = require('sinon');

describe("Products Controller", () => {
  const fakeProduct = {
    
  }

  const response = {};
  const request = {};

  before(() => {
    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns(response);
  })

})