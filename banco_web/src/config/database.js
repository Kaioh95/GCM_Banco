require('dotenv').config()
const mongoose = require('mongoose')

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

async function main(){
    await mongoose.connect(
        `mongodb+srv://teste:teste@cluster0.mz4iw0j.mongodb.net/Banco?retryWrites=true&w=majority`
    )
    console.log('Connected to DataBase!!!')
}

main().catch((err) => console.log(err))

module.exports = mongoose
