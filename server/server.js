const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const fileUpload = require('express-fileupload')

const cors = require('cors')
const morgan = require('morgan')

const authRoutes = require('./routes/auth.routes')
const filesRoutes = require('./routes/file.routes')
const filePathMiddleware = require('./middleware/filepath.middleware')
const path = require('path')

// const port = process.env.PORT || 5000

const PORT = process.env.PORT || config.get('serverPort')
const app = express()
const url = config.get('dbUrl')

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(filePathMiddleware(path.resolve(__dirname, 'files')))
app.use(fileUpload({}))
app.use(express.static('static'))
app.use('/api/auth', authRoutes)
app.use('/api/files', filesRoutes)

mongoose
   .connect(url)
   .then(() => {
      app.listen(PORT, () => {
         console.log(`MongoDb connect and server start run ${PORT}`)
      })
   })
   .catch(error => console.log(error))
