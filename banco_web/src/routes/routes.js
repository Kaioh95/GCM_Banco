const router = require('express').Router()
const accountController = require('../controllers/accountController')

router.post("/", accountController.createaccount)
//router.get("/", accountController.saldo)
router.patch("/credito", accountController.credit)
router.patch("/debito", accountController.debit)
//router.delete("/billingCycle/:id", billingCycleController.delete)

module.exports = router;