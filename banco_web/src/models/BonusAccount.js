const mongoose = require('mongoose')
const { Schema } = mongoose

const BonusAccount = mongoose.model('BonusAccount', 
    new Schema({
        accountId: { type: String, required: true},
        balance: { type: Number, required: true},
        points: { type: Number, required: true}
    }, {timestamps: true})
);

module.exports = BonusAccount