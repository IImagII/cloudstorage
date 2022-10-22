const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const cors = require('cors')
const morgan = require('morgan')

// const port = process.env.PORT || 5000

const PORT = config.get('serverPort')
const app = express()
const url = config.get('dbUrl')

app.use(morgan('dev'))
app.use(cors())

mongoose
   .connect(url)
   .then(() => {
      app.listen(PORT, () => {
         console.log(`MongoDb connect and server start run ${PORT}`)
      })
   })
   .catch(error => console.log(error))
