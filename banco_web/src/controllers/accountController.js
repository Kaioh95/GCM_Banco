require("dotenv").config()
const _ = require('lodash')
const Account = require('../models/Account')


const sendErrorsDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).send({ errors })
}

const createaccount = (req, res, next) => {
    const accountId = req.body.accountId || ''
    const balance = req.body.balance || ''

    if(!parseInt(accountId)){
        return res.status(400).send({ errors: ['Id inválido!']})
    }


    Account.findOne({ accountId }, (err, account) => {
        if(err){
            console.log(err)
            return sendErrorsDB(res, err)
        } else if(account){
            return res.status(400).send({errors: ['A conta já existe!']})
        } else {
            const newAccount = new Account({ accountId: parseInt(accountId), balance: 0 })
            newAccount.save(err => {
                if(err){
                    return sendErrorsDB(res, err)
                } else {
                    res.status(200).send({ accountId })
                }
            })
        }
    })
}

module.exports = {createaccount}