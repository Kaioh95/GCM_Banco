require('dotenv').config()
const mongoose = require('mongoose')

//const dbUser = process.env.DB_USER
//const dbPass = process.env.DB_PASS
// mongodb://127.0.0.1:27017
const dbUrl = process.env.DB_URL || 'mongodb+srv://teste:teste@cluster0.mz4iw0j.mongodb.net/Banco?retryWrites=true&w=majority'

async function main(){
    await mongoose.connect(
        dbUrl
    )
    console.log('Connected to DataBase!!!')
}

main().catch((err) => console.log(err))

module.exports = mongoose
