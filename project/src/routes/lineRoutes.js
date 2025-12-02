const express = require('express')
const router = express.Router()
const lineController = require('../controllers/lineController')

router.get('/', lineController.getAll)
router.get('/search', lineController.search)
router.post('/', lineController.create)
router.put('/:id', lineController.update)
router.delete('/:id', lineController.remove)

module.exports = router
