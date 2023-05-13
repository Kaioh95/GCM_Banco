const router = require('express').Router()
const accountController = require('../controllers/accountController')

router.post("/", accountController.createaccount)
//router.get("/", accountController.saldo)
//router.patch("/credito/:id", accountController.credito)
//router.delete("/billingCycle/:id", billingCycleController.delete)

module.exports = router;