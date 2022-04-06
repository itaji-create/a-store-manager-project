require("dotenv/config");

const { expect } = require('chai');
const ProductController = require('../../../controllers/products');
const ProductService = require('../../../services/product');
const ProductModel = require('../../../models/products');
const sinon = require('sinon');

describe("Products Controller", () => {
  const fakeProduct = {
    id: 1,
    name: 'produto A',
    quantity: 10
  };
  
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
      ProductModel.getAll.restore();
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

      expect(response.status.calledWith(201));
    });
  })
  describe('valida requisição de buscar produto por id', () => {
    before(() => {
      sinon.stub(ProductModel, 'getById').resolves([fakeProduct]);
    });
    after(() => {
      ProductModel.getById.restore();
    });
    it('product retornado com sucesso', async () => {
      await ProductController.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
  describe('valida requisição de deletar produto', () => {
    before(() => {
      sinon.stub(ProductService, 'deleteById').resolves({ status: 204 });
    });
    after(() => {
      ProductService.deleteById.restore(); 
    });
    it('product deletado com sucesso', async () => {
      await ProductController.deleteById(request, response);

      expect(response.status.calledWith(204));
      expect(response.json.calledWith(fakeProduct))
    })
  });
});