const express = require('express')
const router = express.Router()
const stopController = require('../controllers/stopController')

router.get('/', stopController.getAll)
router.get('/search', stopController.search)
router.post('/', stopController.create)
router.put('/:id', stopController.update)
router.delete('/:id', stopController.remove)

module.exports = router
