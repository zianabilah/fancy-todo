var express = require('express');
const userController = require('../controllers/userController')
var router = express.Router();

/* GET users listing. */
router.get('/', userController.findAll)
router.get('/:id', userController.findByID)
router.post('/',userController.create)
router.put('/:id', userController.update)
router.delete('/:id', userController.destroy)

module.exports = router;
