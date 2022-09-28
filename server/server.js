const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const chalk = require('chalk')
require('dotenv').config()
const products = require('./products')
const bodyParser = require('body-parser')
const cors = require('cors')

const errorMsg = chalk.bgKeyword('white').redBright
const successMsg = chalk.bgKeyword('green').white

const app = express()

const PORT = 3000

const USERNAME = process.env.MONGO_USERNAME
const PASSWORD = process.env.MONGO_PASSWORD
const HOSTNAME = process.env.MONGO_HOSTNAME
const DB_PORT = process.env.MONGO_PORT
const DB_NAME = process.env.MONGO_DB

const url = `mongodb://${USERNAME}:${PASSWORD}@${HOSTNAME}:${DB_PORT}/${DB_NAME}?authSource=admin`

/* app.use(express.urlencoded({ extended: true })); // встроенный бодипарсер */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

mongoose
    .connect(url, {useNewUrlParser: true})
    .then((res) => console.log(successMsg('Connected to DB')))
    .catch((error) => console.log(errorMsg(error)))

app.listen(PORT, 'localhost', (error) => {
    error
        ? console.log(errorMsg(error))
        : console.log(successMsg(`Listening port ${PORT}`))
})
app.use(cors())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.static('styles')) // разрешение на доступ к папке

app.use(methodOverride('_method'))

app.use('/products', products)

app.use((req, res, next) => {
    console.log(`path: ${req.path}`)
    console.log(`method: ${req.method}`)
    next()
})

app.use((err, req, res, next) => {
    console.log(err)
}) // отлов ошибок в самом низу логики
