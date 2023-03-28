const express = require('express')
const dotenv = require('dotenv')
const errorHandler = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/products')
app.use('/api/user')
app.use('/api/sale')

app.use(errorHandler)

app.listen(port, () => console.log(`Server start on port ${port}`))