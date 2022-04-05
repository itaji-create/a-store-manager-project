const { expect } = require('chai');
const sinon = require('sinon');
const SalesServices = require('../../../services/sales');
const SalesModel = require('../../../models/sales');

describe('Sales Services', () => {
  const fakeSales = [
    {
      saleId: 1,
      date: "2021-09-09T04:54:29.000Z",
      productId: 1,
      quantity: 2
    },
    {
      saleId: 2,
      date: "2021-09-09T04:54:54.000Z",
      productId: 2,
      quantity: 2
    }
  ];
  describe('Retonar todas as sales', () => {
    before(() => {
      sinon.stub(SalesModel, 'getAll').resolves(fakeSales);
    });
    after(() => {
      SalesModel.getAll.restore();
    });
    const updated = {
        productId: 1,
        quantity: 10,
    }
    it('verifica se array com sales é retornado', async () => {
      const result = await SalesModel.update(1, updated.productId, updated.quantity);
      expect(result).to.be.equal(updated);
    })
  });
});