const mongoose = require('mongoose')
const { Schema } = mongoose

const SavingsAccount = mongoose.model('SavingsAccount', 
    new Schema({
        accountId: { type: String, required: true},
        balance: { type: Number, required: true}
    }, {timestamps: true})
)

module.exports = SavingsAccount