require("dotenv/config");

const { expect } = require('chai');
const ProductsModel = require('../../../models/products');
const sinon = require('sinon');
const connection = require('../../../models/connection');

describe('Product Model', () => {
  const fakeProduct = [{
    id: 1,
    name: 'produto A',
    quantity: 10
  }];
  const { name, quantity } = fakeProduct;
  before(() => {
    sinon.stub(connection, 'execute').resolves([fakeProduct]);
  })
  after(() => {
    connection.execute.restore();
  })
  describe('Lista de todos os produtos', () => {
    it('Retorna array com todos os produtos', async () => {
      const result = await ProductsModel.getAll();

      expect(result).to.be.an('array');
    });
    it('Retorna produto por id', async () => {
      const result = await ProductsModel.getById(1);

      expect(result[0]).to.be.a('object');
      expect(result[0].id).to.be.equal(1);
    })
  });
  describe('Cria um novo produto', () => {
    it('retorna produto criado', async () => {
      const result = await ProductsModel.add('produto B', 10);
      expect(result.name).to.be.equals('produto B');
    })
  })
  describe('altera valores de um produto', () => {
    it('retorna produto alterado', async () => {
      const result = await ProductsModel.update();
      expect(result).to.be.equals(fakeProduct)
    })
  })
  describe('deleta produto', () => {
    it('verifica se produto foi deletado', () => {
      ProductsModel.deleteById(1).then( async () => {
        const result = await ProductsModel.getById(1);
        expect(result[0].id).to.be.null;
      });
    })
  })
})