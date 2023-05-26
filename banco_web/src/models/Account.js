const mongoose = require('mongoose')
const { Schema } = mongoose

const Account = mongoose.model('Account', 
    new Schema({
        accountId: { type: String, required: true},
        balance: { type: Number, required: true}
    }, {timestamps: true})
)

module.exports = Account