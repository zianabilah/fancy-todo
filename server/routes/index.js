var express = require('express');
var router = express.Router();
const oauthController = require('../controllers/oauthController')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/login', oauthController.signin)
router.post('/signup', oauthController.signup)


module.exports = router;
