require("dotenv/config");

const { expect } = require('chai');
const sinon = require('sinon');
const SalesServices = require('../../../services/sales');
const SalesModel = require('../../../models/sales');

describe('Sales Services', () => {
  const fakeSale = {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2
  };
  describe('GetSale', () => {
    before(() => {
      sinon.stub(SalesModel, 'update').resolves(fakeSale);
    });
    after(() => {
      SalesModel.update.restore();
    });
    it('verifica se sale update de services retorna objeto recebido da camada model', async () => {
      const result = await SalesServices.update();
      expect(result).to.be.equal(fakeSale);
    })
  });
  describe('verifica se retorna objeto correto', () => {
    before(() => {
      sinon.stub(SalesModel, 'getById').resolves([fakeSale]);
    });
    after(() => {
      SalesModel.getById.restore();
    });
    it('retorna objeto vazio apos exclusão ter sido efetivada', async () => {
      const result = await SalesServices.deleteById(1);
      expect(result.status).to.be.equal(204);
    })
  })
});