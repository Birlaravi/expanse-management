const express=require('express');
const { loginController, registerController} = require('../controllers/userControler');
const router=express.Router();

//routers

//post method || login 
router.post('/login',loginController);

//post method ||regiter
router.post('/register',registerController);
  
module.exports=router;