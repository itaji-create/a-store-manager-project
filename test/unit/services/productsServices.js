const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/products');
const ProductsService = require('../../../services/product');

describe('Products Service', () => {
  const fakeProduct = [{
    id: 1,
    name: 'produto A',
    quantity: 10
  }];
  before(() => {
    sinon.stub(connection, 'execute').resolves([fakeProduct]);
  });
  after(() => {
    connection.execute.restore();
  });
  describe('quando tenta criar product', () => {
    it('retorna erro quando tenta criar produto ja existente', async () => {
      const result = await ProductsService.add('produto A', 10);
      expect(result.message).to.be.equals('Product already exists');
    })
  });
  describe('quando product é criado com sucesso', () => {
    before(() => {
      sinon.stub(ProductsModel, 'getByName').resolves(false);
    });
    after(() => {
      ProductsModel.getByName.restore();
    });
    it('deve retornar o produto criado', async () => {
      const result = await ProductsService.add('produto B', 10);
      expect(result.name).to.be.equals('produto B')
    })
  })
  describe('quando product que não existe é alterado', () => {
    before(() => {
      sinon.stub(ProductsModel, 'getById').resolves(false);
    });
    after(() => {
      ProductsModel.getById.restore();
    });
    it('retorna erro', async () => {
      const result = await ProductsService.update(1, 'produto alterado', 20);
      expect(result.message).to.be.equals('Product not found');
    })
  });
  describe('quando produto é alterado com sucesso', () => {
    it('retorna product alterado', async () => {
      const result = await ProductsService.update(1, 'produto alterado', 20);
      expect(result.name).to.be.equals('produto alterado');
    })
  });
  describe('tenta deletar um produto com id existente', () => {
    it('retorna status 204 caso produto tenha sido deletado', async () => {
      const result = await ProductsService.deleteById(1);
      expect(result.status).to.be.equal(204);
    })
    
  })
  describe('tenta deletar um produto com id inexistente', () => {
    before(() => {
      sinon.stub(ProductsModel, 'getById').resolves(false);
    });
    after(() => {
      ProductsModel.getById.restore();
    });
    it('retorna erro quando não encontra o id do produto a ser deletado', async () => {
      const result = await ProductsService.deleteById(1);
      expect(result.message).to.be.equal('Product not found');
    })
  })
})
