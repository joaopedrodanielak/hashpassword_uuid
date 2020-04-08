const express = require('express');
const router = express.Router()
const userControllers = require('./controllers/userControllers')
const {create} = require('./controllers/productController')
//login
router.get('/usuarios',userControllers.usuarios)
router.get('/',userControllers.ola)
router.get('/:id/usuarios',userControllers.getUserById)
router.post('/cadastro',userControllers.Store)
router.post('/login',userControllers.signIn)
//-------------------------------------------------------------------//
//products
router.post('/cadastrar/produto/:userId',userControllers.isAdmin,create)
module.exports = router;