const _ = require('lodash')
const Account = require('../models/Account')
const BonusAccount = require('../models/BonusAccount')
const SavingsAccount = require('../models/SavingsAccount')


const sendErrorsDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).send({ errors })
}

const createaccount = async (req, res, next) => {
    const accountId = req.body.accountId || ''
    const balance = req.body.balance || ''

    if(!parseInt(accountId)){
        return res.status(400).send({ errors: ['Id inválido!']})
    }

    if(!balance){
        return res.status(422).json({msg: "Informe o saldo inicial!"})
    }

    const account = await Account.findOne({ accountId});

    if(account){
        return res.status(403).send({ errors: ['A Conta já existe!']});
    }

    try{
        const newAccount = new Account({ accountId: parseInt(accountId), balance: balance});
        await newAccount.save()

        return res.status(200).json({msg: 'Conta criada!', account: newAccount})
    } catch(err){
        return res.status(500).send({ errors: [err]});
    }
}

const credit = async (req, res, next) => {
    const accountId = req.body.accountId
    const credits = req.body.credits

    if(!accountId){
        return res.status(422).json({msg: "Número da conta é obrigatório!"})
    }
    if(!credits){
        return res.status(422).json({msg: "Valor a ser creditado é obrigatório!"})
    }

    if(credits < 0) {
        return res.status(422).json({msg: "Valor creditado não pode ser negativo!"})
    }

    const account = await Account.findOne({ accountId });

    if(!account){
        return res.status(422).json({msg: "A conta não existe!"})
    }   

    try{
        account.balance += credits;

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
        res.status(500).json({msg: err, errors: [err]})
    }

}

const debit = async (req, res, next) => {
    const accountId = req.body.accountId
    const debits = req.body.debits

    if(!accountId){
        return res.status(422).json({msg: "Número da conta é obrigatório!"})
    }
    if(!debits){
        return res.status(422).json({msg: "Valor a ser debitado é obrigatório!"})
    }

    if(debits < 0) {
        return res.status(422).json({msg: "Valor debitado não pode ser negativo!"})
    }

    const account = await Account.findOne({ accountId });

    if(!account){
        return res.status(422).json({msg: "A conta não existe!"})
    }   

    try{
        account.balance -= debits;
        
        const updatedAccount = await Account.findOneAndUpdate(
            { _id: account._id },
            { $set: account},
            { new: true, runValidators: true },
        )

        console.log("ASDASDAS")
        return res.status(200).json({
            msg: "Débito realizado!",
            updatedAccount,
        })    
    } catch(err){
        res.status(500).json({msg: err, errors: [err]})
    }

}

const AccountType = {NORMAL: "NORMAL", BONUS: "BONUS", SAVINGS: "SAVINGS"}

const findUpdate = async (accountModel, dest) => {
    return await accountModel.findOneAndUpdate(
        { _id: dest._id },
        { $set: dest},
        { new: true, runValidators: true },
    )
}

const transfer = async (req, res, next) => {
    const accountIdSrc = req.body.accountIdSrc
    const accountIdDest = req.body.accountIdDest
    const value = req.body.value
    const destType = req.body.destType

    if(!accountIdSrc){
        return res.status(422).json({msg: "Número da conta de origem é obrigatório!"})
    }    
    if(!accountIdDest){
        return res.status(422).json({msg: "Número da conta de destino é obrigatório!"})
    }
    if(!value){
        return res.status(422).json({msg: "Valor a ser transferido é obrigatório!"})
    }
    if(value < 0) {
        return res.status(422).json({msg: "Valor transferido não pode ser negativo!"})
    }
    if(!AccountType[destType]){
        return res.status(422).json({msg: "Informe uma operação válida!"})
    } 

    const accountSrc = await Account.findOne({accountId: accountIdSrc});
    const accountDest = destType === AccountType.SAVINGS ?
        await SavingsAccount.findOne({accountId: accountIdDest}):
        destType === AccountType.BONUS?
            await BonusAccount.findOne({accountId: accountIdDest}):
            await Account.findOne({accountId: accountIdDest});

    if(!accountSrc){
        return res.status(422).json({msg: "Conta de origem não existe!"})
    }    
    if(!accountDest){
        return res.status(422).json({msg: "Conta de destino não existe!"})
    }

    if(value > accountSrc.balance){
        return res.status(422).json({msg: "Saldo insuficiente para realização da transferência!"})
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
        if(destType === AccountType.BONUS){
            accountDest.points += Math.floor(value / 200);
            accountDest.points = parseInt(accountDest.points);
        }
        const updatedAccountDest = await findUpdate(destType == AccountType.BONUS
            ? BonusAccount : destType == AccountType.SAVINGS? SavingsAccount : Account , accountDest);

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