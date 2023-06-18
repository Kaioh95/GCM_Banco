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
    }).timeout(30000);

    it('Cadastrar conta simples 2', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 192,
                balance: 500
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
        assert.equal(data.account.balance, 500);
    });
    /*it('Get Account By Id', async function() {
        const response = await supertest(server).get("/api/101").send({})
        assert.equal(response.statusCode, 200);
    });*/
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
    }).timeout(30000);

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
    }).timeout(30000);

    it('Cadastrar conta poupança 2', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 392,
                balance: 500
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
        assert.equal(data.account.balance, 500);
    });
});

describe('Operações de Crédito', async () => {

    it('Crédito Caso Simples', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 191,
                credits: 50,
            }
        });
        const res = httpMocks.createResponse();

        const response = await accountController.credit(req, res);

        const data = response._getJSONData();
        data.should.have.property('updatedAccount');
        assert.equal(data.updatedAccount.accountId, "191");
        assert.equal(data.updatedAccount.balance, 150);
    }).timeout(30000);

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

    it('Crédito Caso Bônus', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 291,
                credits: 525,
            }
        });
        const res = httpMocks.createResponse();

        const response = await bonusAccountController.credit(req, res);

        const data = response._getJSONData();
        data.should.have.property('updatedAccount');
        assert.equal(data.updatedAccount.accountId, "291");
        assert.equal(data.updatedAccount.balance, 525);
        assert.equal(data.updatedAccount.points, 15);
    });

    it('Crédito Parâmetro Negativo - Conta Bônus', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 291,
                credits: -25,
            }
        });
        const res = httpMocks.createResponse();

        const response = await bonusAccountController.credit(req, res);

        expect(response.statusCode).to.not.equal(200);
    });

    it('Crédito Conta Poupança', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 391,
                credits: 25,
            }
        });
        const res = httpMocks.createResponse();

        const response = await savingsAccountController.credit(req, res);

        const data = response._getJSONData();
        data.should.have.property('updatedAccount');
        assert.equal(data.updatedAccount.accountId, "391");
        assert.equal(data.updatedAccount.balance, 325);
    });

    it('Crédito Parâmetro Negativo - Conta Poupança', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 391,
                credits: -25,
            }
        });
        const res = httpMocks.createResponse();

        const response = await savingsAccountController.credit(req, res);

        expect(response.statusCode).to.not.equal(200);
    });

});

describe('Operações de Débito', async () => {

    it('Débito Caso Simples', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 191,
                debits: 25,
            }
        });
        const res = httpMocks.createResponse();

        const response = await accountController.debit(req, res);

        const data = response._getJSONData();
        data.should.have.property('updatedAccount');
        assert.equal(data.updatedAccount.accountId, "191");
        assert.equal(data.updatedAccount.balance, 125);
    }).timeout(30000);

    it('Débito Parâmetro Negativo', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 191,
                debits: -25,
            }
        });
        const res = httpMocks.createResponse();

        const response = await accountController.debit(req, res);

        expect(response.statusCode).to.not.equal(200);
    });

    it('Débito Saldo Negativo', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 191,
                debits: 1200,
            }
        });
        const res = httpMocks.createResponse();

        const response = await accountController.debit(req, res);

        expect(response.statusCode).to.not.equal(200);
    });

    it('Débito Caso Bônus', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 291,
                debits: 25,
            }
        });
        const res = httpMocks.createResponse();

        const response = await bonusAccountController.debit(req, res);

        const data = response._getJSONData();
        data.should.have.property('updatedAccount');
        assert.equal(data.updatedAccount.accountId, "291");
        assert.equal(data.updatedAccount.balance, 500);
        assert.equal(data.updatedAccount.points, 15);
    });

    it('Débito Parâmetro Negativo - Conta Bônus', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 291,
                debits: -25,
            }
        });
        const res = httpMocks.createResponse();

        const response = await bonusAccountController.debit(req, res);

        expect(response.statusCode).to.not.equal(200);
    });

    it('Débito Saldo Negativo - Conta Bônus', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 291,
                debits: 2000,
            }
        });
        const res = httpMocks.createResponse();

        const response = await bonusAccountController.debit(req, res);

        expect(response.statusCode).to.not.equal(200);
    });

    it('Débito Conta Poupança', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 391,
                debits: 25,
            }
        });
        const res = httpMocks.createResponse();

        const response = await savingsAccountController.debit(req, res);

        const data = response._getJSONData();
        data.should.have.property('updatedAccount');
        assert.equal(data.updatedAccount.accountId, "391");
        assert.equal(data.updatedAccount.balance, 300);
    });

    it('Débito Parâmetro Negativo - Conta Poupança', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 391,
                debits: -25,
            }
        });
        const res = httpMocks.createResponse();

        const response = await savingsAccountController.debit(req, res);

        expect(response.statusCode).to.not.equal(200);
    });

});

describe('Operações de Transferência', async () => {

    it('Transferência Caso Simples', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountIdSrc: 191,
                accountIdDest: 192,
                value: 25,
                destType: "NORMAL",
            }
        });
        const res = httpMocks.createResponse();

        const response = await accountController.transfer(req, res);

        const data = response._getJSONData();
        data.should.have.property('updatedAccountDest');
        assert.equal(data.updatedAccountDest.accountId, "192");
        assert.equal(data.updatedAccountDest.balance, 525);
    }).timeout(30000);

    it('Transferência Parâmetro Negativo', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountIdSrc: 191,
                accountIdDest: 192,
                value: -50,
                destType: "NORMAL",
            }
        });
        const res = httpMocks.createResponse();

        const response = await accountController.transfer(req, res);

        expect(response.statusCode).to.not.equal(200);
    });

    it('Transferência Saldo Negativo', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountIdSrc: 191,
                accountIdDest: 192,
                value: 2000,
                destType: "NORMAL",
            }
        });
        const res = httpMocks.createResponse();

        const response = await accountController.transfer(req, res);

        expect(response.statusCode).to.not.equal(200);
    });

    it('Transferência Caso Bônus', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountIdSrc: 291,
                accountIdDest: 292,
                value: 300,
                destType: "BONUS",
            }
        });
        const res = httpMocks.createResponse();

        const response = await bonusAccountController.transfer(req, res);

        const data = response._getJSONData();
        data.should.have.property('updatedAccountDest');
        assert.equal(data.updatedAccountDest.accountId, "292");
        assert.equal(data.updatedAccountDest.balance, 300);
        assert.equal(data.updatedAccountDest.points, 12);
    });

    it('Transferência Parâmetro Negativo - Conta Bônus', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountIdSrc: 291,
                accountIdDest: 292,
                value: -20,
                destType: "BONUS",
            }
        });
        const res = httpMocks.createResponse();

        const response = await bonusAccountController.transfer(req, res);

        expect(response.statusCode).to.not.equal(200);
    });

    it('Transferência Saldo Negativo - Conta Bônus', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountIdSrc: 291,
                accountIdDest: 292,
                value: 2000,
                destType: "BONUS",
            }
        });
        const res = httpMocks.createResponse();

        const response = await bonusAccountController.transfer(req, res);

        expect(response.statusCode).to.not.equal(200);
    });

    it('Transferência Conta Poupança', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountIdSrc: 391,
                accountIdDest: 392,
                value: 100,
                destType: "SAVINGS",
            }
        });
        const res = httpMocks.createResponse();

        const response = await savingsAccountController.transfer(req, res);

        const data = response._getJSONData();
        data.should.have.property('updatedAccountDest');
        assert.equal(data.updatedAccountDest.accountId, "392");
        assert.equal(data.updatedAccountDest.balance, 600);
    });

    it('Transferência Parâmetro Negativo - Conta Poupança', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountIdSrc: 391,
                accountIdDest: 392,
                value: -25,
                destType: "SAVINGS",
            }
        });
        const res = httpMocks.createResponse();

        const response = await savingsAccountController.transfer(req, res);

        expect(response.statusCode).to.not.equal(200);
    });

    it('Transferência NORMAL -> BONUS', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountIdSrc: 191,
                accountIdDest: 291,
                value: 50,
                destType: "BONUS",
            }
        });
        const res = httpMocks.createResponse();

        const response = await accountController.transfer(req, res);

        const data = response._getJSONData();
        data.should.have.property('updatedAccountDest');
        assert.equal(data.updatedAccountDest.accountId, "291");
        assert.equal(data.updatedAccountDest.balance, 250);
        assert.equal(data.updatedAccountDest.points, 15);
    });

    it('Transferência NORMAL -> SAVINGS', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountIdSrc: 191,
                accountIdDest: 391,
                value: 50,
                destType: "SAVINGS",
            }
        });
        const res = httpMocks.createResponse();

        const response = await accountController.transfer(req, res);

        const data = response._getJSONData();
        data.should.have.property('updatedAccountDest');
        assert.equal(data.updatedAccountDest.accountId, "391");
        assert.equal(data.updatedAccountDest.balance, 250);
    });

    it('Transferência BONUS -> NORMAL', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountIdSrc: 291,
                accountIdDest: 191,
                value: 25,
                destType: "NORMAL",
            }
        });
        const res = httpMocks.createResponse();

        const response = await bonusAccountController.transfer(req, res);

        const data = response._getJSONData();
        data.should.have.property('updatedAccountDest');
        assert.equal(data.updatedAccountDest.accountId, "191");
        assert.equal(data.updatedAccountDest.balance, 25);
    });

    it('Transferência BONUS -> SAVINGS', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountIdSrc: 291,
                accountIdDest: 391,
                value: 25,
                destType: "SAVINGS",
            }
        });
        const res = httpMocks.createResponse();

        const response = await bonusAccountController.transfer(req, res);

        const data = response._getJSONData();
        data.should.have.property('updatedAccountDest');
        assert.equal(data.updatedAccountDest.accountId, "391");
        assert.equal(data.updatedAccountDest.balance, 275);
    });

    it('Transferência SAVINGS -> NORMAL', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountIdSrc: 391,
                accountIdDest: 191,
                value: 50,
                destType: "NORMAL",
            }
        });
        const res = httpMocks.createResponse();

        const response = await savingsAccountController.transfer(req, res);

        const data = response._getJSONData();
        data.should.have.property('updatedAccountDest');
        assert.equal(data.updatedAccountDest.accountId, "191");
        assert.equal(data.updatedAccountDest.balance, 75);
    });

    it('Transferência SAVINGS -> BONUS', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountIdSrc: 391,
                accountIdDest: 291,
                value: 25,
                destType: "BONUS",
            }
        });
        const res = httpMocks.createResponse();

        const response = await savingsAccountController.transfer(req, res);

        const data = response._getJSONData();
        data.should.have.property('updatedAccountDest');
        assert.equal(data.updatedAccountDest.accountId, "291");
        assert.equal(data.updatedAccountDest.balance, 225);
        assert.equal(data.updatedAccountDest.points, 15);
    });

});

describe('Operações de Render Juros', async () => {
    it('Render Juros Conta 1', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 391,
                fee: 0.2
            }
        });
        const res = httpMocks.createResponse();

        const response = await savingsAccountController.bearInterest(req, res);

        const data = response._getJSONData();
        data.should.have.property('account');
        assert.equal(data.account.accountId, "391");
        assert.equal(data.account.balance, 240);
    }).timeout(30000);

    it('Render Juros Conta 2', async function(){
        const req = httpMocks.createRequest({
            body: {
                accountId: 392,
                fee: 0.15
            }
        });
        const res = httpMocks.createResponse();

        const response = await savingsAccountController.bearInterest(req, res);

        const data = response._getJSONData();
        data.should.have.property('account');
        assert.equal(data.account.accountId, "392");
        assert.equal(data.account.balance, 690);
    });

    
    after( async function(){
        await Account.deleteOne({accountId: 191});
        await Account.deleteOne({accountId: 192});

        await BonusAccount.deleteOne({accountId: 291});
        await BonusAccount.deleteOne({accountId: 292});

        await SavingsAccount.deleteOne({accountId: 391});
        await SavingsAccount.deleteOne({accountId: 392});
    })
});

