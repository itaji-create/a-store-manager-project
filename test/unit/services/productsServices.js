const { expect } = require('chai');
const sinon = require('sinon');
const ProductsModel = require('../../../models/products');
const ProductsService = require('../../../services/product');

describe('Products Service', () => {
  const fakeProduct = {
    id: 1,
    name: 'produto A',
    quantity: 10
  };
  const { id, name, quantity } = fakeProduct;
  describe('quando product é criado com sucesso', () => {
    before(() => {
      sinon.stub(ProductsModel, 'add').resolves(fakeProduct)
    });
    after(() => {
      ProductsModel.add.restore();
    });
    it('deve retornar um product', async () => {
      const result = await ProductsService.add(name, quantity);
      expect(result.name).to.be.equals('produto A');
      expect(result.quantity).to.be.equals(10);
    })
  });
  describe('quando product inexistente é alterado', () => {
    before(() => {
      sinon.stub(ProductsModel, 'update').resolves(fakeProduct);
    })
    after(() => {
      ProductsModel.update.restore();
    })
    it('quando produto existente é alterado', async () => {
      const result = await ProductsService.update(id, name, quantity);
      expect(result.name).to.be.equals('produto A');
    })
  })
  describe('quando product que já existe é alterado', () => {
    before(() => {
      sinon.stub(ProductsModel, 'add').resolves(fakeProduct)
    })
    after(() => {
      ProductsModel.add.restore();
    })
    it('retorna ', async () => {
      const result = await ProductsService.update(2, name, quantity);

      expect(result.message).to.be.equals('Product not found');
    })
  })
})
