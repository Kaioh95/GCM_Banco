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

const credit = (req, res, next) => {
    const accountId = req.body.accountId
    const credits = req.body.credits

    if(!accountId){
        return res.status(422).json({msg: "Número da conta é obrigatório!"})
    }
    if(!credits){
        return res.status(422).json({msg: "Valor a ser creaditado é obrigatório!"})
    }

    Account.findOne({ accountId }, async (err, account) => {
        if(err){
            console.log(err)
            return sendErrorsDB(res, err)
        } else if(account){
            account.balance += credits
            try{
                const updatedAccount = await Account.findOneAndUpdate(
                    { _id: account._id },
                    { $set: account},
                    { new: true, runValidators: true },
                )
    
                return res.status(200).json({
                    msg: "Crédito realizado!",
                    updatedAccount,
                })
    
            } catch(err){
                res.status(500).json({msg: err})
            }

        } else {
            res.status(500).send({msg:"error"})
        }
    })

}

const debit = (req, res, next) => {
    const accountId = req.body.accountId
    const debits = req.body.debits

    if(!accountId){
        return res.status(422).json({msg: "Número da conta é obrigatório!"})
    }
    if(!debits){
        return res.status(422).json({msg: "Valor a ser debitado é obrigatório!"})
    }

    Account.findOne({ accountId }, async (err, account) => {
        if(err){
            console.log(err)
            return sendErrorsDB(res, err)
        } else if(account){
            account.balance -= debits
            try{
                const updatedAccount = await Account.findOneAndUpdate(
                    { _id: account._id },
                    { $set: account},
                    { new: true, runValidators: true },
                )
    
                return res.status(200).json({
                    msg: "Débito realizado!",
                    updatedAccount,
                })
    
            } catch(err){
                res.status(500).json({msg: err})
            }

        } else {
            res.status(500).send({msg:"error"})
        }
    })

}

module.exports = {createaccount, credit, debit}