const express = require('express')
const dotenv = require('dotenv')
const errorHandler = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000
const mongoDBConnexion = require('./config/db')

mongoDBConnexion()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/product', require('./routes/productsRoutes'))
app.use('/api/user', require('./routes/usersRoutes'))
app.use('/api/order', require('./routes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server start on port ${port}`))