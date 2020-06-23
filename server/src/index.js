const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

const userRouter = require('./routes/users')

require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.use('/users', userRouter)


app.listen(3000, () => {
  console.log('application started at port 3000')
})
