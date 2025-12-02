const express = require('express')
const router = express.Router()
const tramController = require('../controllers/tramController')

router.get('/', tramController.getAll)
router.get('/search', tramController.search)
router.get('/:id', tramController.getOne)
router.post('/', tramController.create)
router.put('/:id', tramController.update)
router.delete('/:id', tramController.remove)

module.exports = router
