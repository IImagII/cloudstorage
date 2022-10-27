const Router = require('express')
const File = require('../models/File')
const authMiddleware = require('../middleware/auth.middleware')

const router = new Router()

module.exports = router
