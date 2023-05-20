const router = require('express').Router()
const accountController = require('../controllers/accountController')
const BonusAccountController = require('../controllers/bonusAccountController')
const savingsAccountController = require('../controllers/savingsAccountController')

router.post("/", accountController.createaccount)
router.get("/all", accountController.getAccountAll)
router.get("/:id", accountController.getAccount)
router.patch("/credito", accountController.credit)
router.patch("/debito", accountController.debit)
router.patch("/transferir", accountController.transfer)

router.post("/bonus", BonusAccountController.createAccount)
router.get("/bonus/all", BonusAccountController.getAccountAll)
router.get("/bonus/:id", BonusAccountController.getAccount)
router.patch("/bonus/credito", BonusAccountController.credit)
router.patch("/bonus/debito", BonusAccountController.debit)
router.patch("/bonus/transferir", BonusAccountController.transfer)

router.post("/poupanca", savingsAccountController.createAccount)
router.get("/poupanca/all", savingsAccountController.getAccountAll)
router.get("/poupanca/:id", savingsAccountController.getAccount)
router.patch("/poupanca/credito", savingsAccountController.credit)
router.patch("/poupanca/debito", savingsAccountController.debit)
router.patch("/poupanca/transferir", savingsAccountController.transfer)
router.patch("/poupanca/renderjuros", savingsAccountController.bearInterest)

module.exports = router;