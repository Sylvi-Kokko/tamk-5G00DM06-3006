const express = require('express')
const router = express.Router()
const lineController = require('../controllers/lineController')

router.get('/', lineController.getAll)
router.get('/search', lineController.search)
router.post('/', lineController.create)
router.get('/:id', lineController.getOne)
router.put('/:id', lineController.update)
router.delete('/:id', lineController.remove)

module.exports = router
