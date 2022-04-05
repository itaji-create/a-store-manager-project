const { expect } = require('chai');
const ProductController = require('../../../controllers/products');
const ProductService = require('../../../services/product');
const ProductModel = require('../../../models/products');
const sinon = require('sinon');

describe("Products Controller", () => {
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
  });

  describe('valida requisição de retornar todas as sales', () => {
    before(() => {
      sinon.stub(ProductModel, 'getAll').resolves(fakeProduct);
    });
    after(() => {
      ProductController.getAll.restore();
    });
    it('getAll retornar arrays com sales', async () => {
      await ProductController.getAll(request, response);
      expect(response.json.calledWith(fakeProduct));
    });
  });
  describe('valida requisição de criar novo product', () => {
    before(() => {
      sinon.stub(ProductService, 'add').resolves(fakeProduct);
    });
    after(() => {
      ProductService.add.restore();
    });
    it('product criado com sucesso', async () => {
      await ProductController.add(request, response);

      expect(response.json.calledWith(fakeProduct)).to.be.equal(true);
    });
  })
  describe('valida req de buscar produto por id', () => {
    before(() => {
      sinon.stub(ProductModel, 'getById').returns([fakeProduct]);
    })
    after(() => {
      ProductModel.getById.restore();
    });
    it('product retornado com sucesso', async () => {
      await ProductController.getById(request, response);

      expect(response.json(fakeProduct)).to.be.equal(true);
    })
  })
})