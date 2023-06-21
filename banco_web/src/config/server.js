require('dotenv').config()
const express = require('express')
const cors = require('cors')

const port = process.env.PORT || 3003

const server = express()
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../routes/swagger_output.json')

server.use(express.urlencoded({extended: true}))
server.use(express.json())
server.use(cors({ credentials: true, origin: process.env.FRONT_URL || 'http://localhost:3000'}))

const Routes = require('../routes/routes')
server.use('/api', Routes)

server.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

server.listen(port, function(){
    console.log(`BACKEND is running in port ${port}`)
})


