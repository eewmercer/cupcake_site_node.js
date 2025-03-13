const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const errorController = require('../controllers/error');
const cupcakesController = require('../controllers/cupcakes');

router.get('/', adminController.getLoginPage)
router.post('/user-login', adminController.postLoginPage)

router.get('/register', adminController.getRegisterPage)
router.post('/register', adminController.postRegisterPage)

router.get('/system', adminController.getAddCupcakePage)

router.get('/about', adminController.getAboutPage)

router.post('/add-cupcake', cupcakesController.postAddCupcake)

router.get('/edit-cupcake', cupcakesController.getEditCupcake)

router.post('/complete-edit', cupcakesController.postEditCupcake)

router.post('/delete-cupcake', cupcakesController.postDeleteCupcake)

//404 => ERROR
router.get('/404', errorController.get404)

module.exports = router;
exports.routes = router;