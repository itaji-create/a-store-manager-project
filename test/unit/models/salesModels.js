const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const SalesModel = require('../../../models/sales')

describe('Sales Model', () => {
  const fakeSale = [{
    sale_id: 1,
    product_id: 1,
    quantity: 5,
    date: "2022-04-05T00:55:29.000Z"
  }];

  before(() => {
    sinon.stub(connection, 'execute').resolves([fakeSale]);
  });
  after(() => {
    connection.execute.restore();
  });
  describe('Retorna sales com getAll', () => {
    it('retorna sales', async () => {
      const result = await SalesModel.getAll();
      expect(result[0].quantity).to.be.equal(5);
    });
  });
})