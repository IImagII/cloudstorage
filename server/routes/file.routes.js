const Router = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const FileController = require('../controllers/fileController')

const router = new Router()

router.post('', authMiddleware, FileController.createDir)
router.get('', authMiddleware, FileController.fetFiles)
router.post('/upload', authMiddleware, FileController.uploadFile)
router.post('/avatar', authMiddleware, FileController.uploadAvatars)
router.get('/download', authMiddleware, FileController.downloadFile)
router.delete('/', authMiddleware, FileController.deleteFile)
router.get('/search', authMiddleware, FileController.searchFile)
router.delete('/avatar', authMiddleware, FileController.deleteAvatars)

module.exports = router
