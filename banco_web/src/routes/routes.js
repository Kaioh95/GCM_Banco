const router = require('express').Router()
const accountController = require('../controllers/accountController')
const BonusAccountController = require('../controllers/bonusAccountController')

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

module.exports = router;