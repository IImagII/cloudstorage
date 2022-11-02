const Router = require('express')
const File = require('../models/File')
const authMiddleware = require('../middleware/auth.middleware')
const FileController = require('../controllers/fileController')

const router = new Router()

router.post('', authMiddleware, FileController.createDir)
router.get('', authMiddleware, FileController.fetFiles)
router.post('/upload', authMiddleware, FileController.uploadFile)
router.get('/download', authMiddleware, FileController.downloadFile)

module.exports = router
