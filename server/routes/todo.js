router = require('express').Router()
const todoController = require('../controllers/todoController')


router.get('/', todoController.findAll)
router.post('/', todoController.create)
router.get('/:id', todoController.findById)
router.put('/:id', todoController.update)
router.delete('/:id', todoController.destroy)





module.exports = router