const router = require('express').Router()
const accountController = require('../controllers/accountController')

router.post("/", accountController.createaccount)
router.get("/:id", accountController.getAccount)
router.get("/all", accountController.getAccountAll)
router.patch("/credito", accountController.credit)
router.patch("/debito", accountController.debit)
router.patch("/transferir", accountController.transfer)

module.exports = router;