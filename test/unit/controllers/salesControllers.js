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
      sinon.stub(SalesModel, 'getAll').resolves([fakeSales]);
    });
    after(() => {
      SalesModel.getAll.restore();
    });
    
  })
  it('retorna array com sales', () => {
    SalesControllers.getAll(request, response).then(() => {
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

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
      SalesControllers.add(request, response).then(() => {
        expect(response.status.calledWith(201)).to.be.equal(true);
      });
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

      expect(response.status.calledWith(200)).to.be.equal(true);
    })
  });
  describe('update', () => {
    const fakeSale = { productId: 1, quantity: 10 }
    before(() => {
      sinon.stub(SalesServices, 'update').resolves(fakeSale);
    });
    after(() => {
      SalesServices.update.restore();
    });
    it('verifica retorno de sale editado', async () => {
      await SalesControllers.update(request, response);

      expect(response.status.calledWith(200));
      expect(response.json.calledWith(fakeSale)).to.be.equal(true);
    })
  });
})