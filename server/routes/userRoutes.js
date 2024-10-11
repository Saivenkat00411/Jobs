const express=require('express')
const { login, register, logOut, getCurrentUser, getApplicationStats, updateUser } = require('../controllers/userController');
const { validateUser, validateLoginUser,validateJob } = require('../middlewares/Validation');
const authenticationMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerMiddle');
const checkTestUser=require('../middlewares/checkTestUser')
const router=express.Router()

router.post('/register',validateUser,register);
router.post('/login',validateLoginUser,login);
router.get('/logout',logOut);
router.get('/currentUser',authenticationMiddleware,getCurrentUser);
router.get('stats',authenticationMiddleware,getApplicationStats);
router.patch('/updateUser',authenticationMiddleware,checkTestUser,upload.single('avatar'),updateUser);
module.exports=router