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
                    res.status(200).send({msg: "Conta Criada!", accountId })
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

const transfer = async (req, res, next) => {
    const accountIdSrc = req.body.accountIdSrc
    const accountIdDest = req.body.accountIdDest
    const value = req.body.value

    if(!accountIdSrc){
        return res.status(422).json({msg: "Número da conta de origem é obrigatório!"})
    }    
    if(!accountIdDest){
        return res.status(422).json({msg: "Número da conta de destino é obrigatório!"})
    }
    if(!value){
        return res.status(422).json({msg: "Valor a ser transferido é obrigatório!"})
    }

    const accountSrc = await Account.findOne({accountId: accountIdSrc});
    const accountDest = await Account.findOne({accountId: accountIdDest});

    if(!accountSrc){
        return res.status(422).json({msg: "Conta de origem não existe!"})
    }    
    if(!accountDest){
        return res.status(422).json({msg: "Conta de destino não existe!"})
    }

    accountSrc.balance -= value;
    accountDest.balance += value;

    try{
        const updatedAccountSrc = await Account.findOneAndUpdate(
            { _id: accountSrc._id },
            { $set: accountSrc},
            { new: true, runValidators: true },
        )
      
    } catch(err){
        res.status(500).json({msg: err})
    }

    try{
        const updatedAccountDest = await Account.findOneAndUpdate(
            { _id: accountDest._id },
            { $set: accountDest},
            { new: true, runValidators: true },
        )

        return res.status(200).json({
            msg: "Transferência realizada!",
            updatedAccountDest,
        })
      
    } catch(err){
        res.status(500).json({msg: err})
    }

} 

const getAccount = async (req, res, next) => {
    const id = req.params.id;

    if(!id){
        return res.status(422).json({msg: "Número da conta é obrigatório!"})
    }    

    const account = await Account.findOne({accountId: id});

    if(!account){
        return res.status(422).json({msg: "Conta informada não existe!"})
    } 

    return res.status(200).json({
        msg: "Conta encontrada!",
        account:account,
    })
} 

const getAccountAll = async (req, res, next) => {
    
    const accounts = await Account.find();

    if(!accounts){
        return res.status(422).json({msg: "Não foram localizadas contas ativas!"})
    } 

    return res.status(200).json({
        msg: "Conta encontrada!",
        accounts:accounts,
    })
}    

module.exports = {createaccount, credit, debit, transfer, getAccount, getAccountAll}