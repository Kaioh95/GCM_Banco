//const supertest = require("supertest")
const accountController = require('../src/controllers/accountController');
const bonusAccountController = require('../src/controllers/bonusAccountController');
const savingsAccountController = require('../src/controllers/savingsAccountController');

const assert = require('assert').strict;
const httpMocks = require('node-mocks-http');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect

const server = require('../src/config/server');
const database = require('../src/config/database');
const Account = require('../src/models/Account');
const BonusAccount = require('../src/models/BonusAccount');
const SavingsAccount = require('../src/models/SavingsAccount');


before(async function() {
    await server;
    await new Promise(r => setTimeout(r, 2000));
    await database;
});

describe('Conta Simples', async () => {
    it('Cadastrar conta simples 1', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 191,
                balance: 100
            }
        });
        const res = httpMocks.createResponse();

        const response = await accountController.createaccount(req, res);

        assert(response.statusCode, 200);
    }).timeout(50000);

    it('Cadastrar conta simples 2', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 192,
                balance: 100
            }
        });
        const res = httpMocks.createResponse();

        const response = await accountController.createaccount(req, res);

        assert(response.statusCode, 200);
    });

    it('Consultar Conta', async function(){
        const req = httpMocks.createRequest({
            params: {
                id: 192
            }
        });
        const res = httpMocks.createResponse();

        const response = await accountController.getAccount(req, res);

        const data = response._getJSONData();
        data.should.have.property('account');
        assert.equal(data.account.accountId, "192");
        assert.equal(data.account.balance, 100);
    });
});

describe('Conta Bônus', async () => {
    it('Cadastrar conta bônus 1', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 291
            }
        });
        const res = httpMocks.createResponse();

        const response = await bonusAccountController.createAccount(req, res);

        assert(response.statusCode, 200);
    });

    it('Cadastrar conta bônus 2', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 292
            }
        });
        const res = httpMocks.createResponse();

        const response = await bonusAccountController.createAccount(req, res);

        assert(response.statusCode, 200);
    });

    it('Consultar Conta Bônus', async function(){
        const req = httpMocks.createRequest({
            params: {
                id: 292
            }
        });
        const res = httpMocks.createResponse();

        const response = await bonusAccountController.getAccount(req, res);

        const data = response._getJSONData();
        data.should.have.property('account');
        assert.equal(data.account.accountId, "292");
        assert.equal(data.account.balance, 0);
        assert.equal(data.account.points, 10);
    });
});

describe('Conta Poupança', async () => {
    it('Cadastrar conta poupança 1', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 391,
                balance: 300
            }
        });
        const res = httpMocks.createResponse();

        const response = await savingsAccountController.createAccount(req, res);

        assert(response.statusCode, 200);
    });

    it('Cadastrar conta poupança 2', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 392,
                balance: 300
            }
        });
        const res = httpMocks.createResponse();

        const response = await savingsAccountController.createAccount(req, res);

        assert(response.statusCode, 200);
    });

    it('Consultar Conta poupança', async function(){
        const req = httpMocks.createRequest({
            params: {
                id: 392
            }
        });
        const res = httpMocks.createResponse();

        const response = await savingsAccountController.getAccount(req, res);

        const data = response._getJSONData();
        data.should.have.property('account');
        assert.equal(data.account.accountId, "392");
        assert.equal(data.account.balance, 300);
    });
});

describe('Operações de Conta Simples', async () => {

    it('Crédito Caso Simples', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 191,
                credits: 25,
            }
        });
        const res = httpMocks.createResponse();

        const response = await accountController.credit(req, res);

        const data = response._getJSONData();
        data.should.have.property('updatedAccount');
        assert.equal(data.updatedAccount.accountId, "191");
        assert.equal(data.updatedAccount.balance, 125);
    });

    it('Crédito Parâmetro Negativo', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 191,
                credits: -25,
            }
        });
        const res = httpMocks.createResponse();

        const response = await accountController.credit(req, res);

        expect(response.statusCode).to.not.equal(200);
    });

    after( async function(){
        await Account.deleteOne({accountId: 191});
        await Account.deleteOne({accountId: 192});

        await BonusAccount.deleteOne({accountId: 291});
        await BonusAccount.deleteOne({accountId: 292});

        await SavingsAccount.deleteOne({accountId: 391});
        await SavingsAccount.deleteOne({accountId: 392});
    })

    /*it('Get Account By Id', async function() {
        const response = await supertest(server).get("/api/101").send({})
        assert.equal(response.statusCode, 200);
    });*/
});

