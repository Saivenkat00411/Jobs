const express=require('express');
const { getAllJobs, createJob, updatedJob,getUserJobs, getSinglejob, deleteJob, getAllJobsAdmin, showStats } = require('../controllers/controller');
const checkTestUser=require('../middlewares/checkTestUser')
const {validateJob,validateJobParams, validateAdmin} = require('../middlewares/Validation');
const authenticationMiddleware = require('../middlewares/authMiddleware');
const router=express.Router()

router.get('/',getAllJobs);
router.get('/alljobs',validateAdmin,getAllJobsAdmin);
router.get('/usersGroup',validateAdmin,getUserJobs)
router.post('/',validateJob,checkTestUser,createJob);
router.get('/stats',showStats);
router.patch('/:id',validateJob,validateJobParams,checkTestUser,updatedJob);
router.get('/:id',validateJobParams,getSinglejob);
router.delete('/:id',validateJobParams,checkTestUser,deleteJob);

module.exports=router;