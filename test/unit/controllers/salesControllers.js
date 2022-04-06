require("dotenv/config");

const { expect } = require('chai');
const sinon = require('sinon');
const SalesControllers = require('../../../controllers/sales');
const SalesModel = require('../../../models/sales');
const SalesServices = require('../../../services/sales');

describe('Sales Controlles', () => {
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
  const response = {};
  const request = {};
  before(() => {
    response.status = sinon.stub()
    .returns(response);
    response.json = sinon.stub()
    .returns(response);
  });
  describe('getAll', () => {
    before(() => {
      sinon.stub(SalesModel, 'getAll').resolves(fakeSales);
    });
    after(() => {
      SalesModel.getAll.restore();
    });
    
  })
  it('retorna array com sales', async () => {
    await SalesControllers.getAll(request, response);

    expect(response.json.calledWith(fakeSales));
  });
  describe('add', () => {
    const newProduct = {
        productId: 1,
        quantity: 15
    };
    before(() => {
      sinon.stub(SalesModel, 'add').resolves(newProduct);
    });
    after(() => {
      SalesModel.add.restore();
    });
    it('valida requisição de criar nova sale', async () => {
      await SalesControllers.add(request, response);

      expect(response.status.calledWith(201));
    });
  });
  describe('getById', () => {
    before(() => {
      sinon.stub(SalesModel, 'getById').resolves(fakeSales[0]);
    });
    after(() => {
      SalesModel.getById.restore();
    });
    it('valida requisição de retornar product by id', async () => {
      await SalesControllers.getById(request, response);

      expect(response.status.calledWith(200));
    })
  });
})