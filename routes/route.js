const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const errorController = require('../controllers/error');
const cupcakesController = require('../controllers/cupcakes');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', adminController.getLoginPage)
router.post('/user-login', adminController.postLoginPage)

router.get('/register', adminController.getRegisterPage)
router.post('/register', adminController.postRegisterPage)

router.get('/system', isLoggedIn, adminController.getAddCupcakePage)

router.get('/about', isLoggedIn, adminController.getAboutPage)

router.post('/add-cupcake', isLoggedIn, cupcakesController.postAddCupcake)

router.get('/edit-cupcake', isLoggedIn, cupcakesController.getEditCupcake)

router.post('/complete-edit', isLoggedIn, cupcakesController.postEditCupcake)

router.post('/delete-cupcake', isLoggedIn, cupcakesController.postDeleteCupcake)

//404 => ERROR
router.get('/404', errorController.get404)

module.exports = router;
exports.routes = router;