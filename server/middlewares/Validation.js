const { validationResult, body, param } = require("express-validator");
const { BAD_REQUEST, UNAUTHORIZED } = require("../errors/customError");
const { JOBTYPE, JOBSTATUS } = require("../utils/jobConstants");
const userModel=require('../models/userModel')
const { default: mongoose } = require("mongoose");
const { min } = require("lodash");

const validation = (validateValues) => {
    return [validateValues, (req, res, next) => {
        const errors = validationResult(req);
        // console.log(errors);
        if (!errors.isEmpty()) {
            const errormsgs = errors.array().map((err) => err.msg)
            throw new BAD_REQUEST(errormsgs);
        }
        next()
    }]
}

const validateJob = validation([body('company').notEmpty().withMessage('Company is required'),
body('position').notEmpty().withMessage('position is required'),
body('jobLocation').notEmpty().withMessage('jobLocation is required'),
body('jobType').isIn(Object.values(JOBTYPE)).withMessage('Invalid job type'),
body('jobStatus').isIn(Object.values(JOBSTATUS)).withMessage('Invalid job status'),
]
)
const validateJobParams=validation([param('id').custom((idvalue)=>mongoose.Types.ObjectId.isValid(idvalue)).withMessage('provide mongodb id')])
const validateUser=validation([
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('should be a valid email'),
    body('password').notEmpty().withMessage('password is required').isLength({min:6}),
    body('lastName').notEmpty().withMessage('lastname is required'),
    body('location').notEmpty().withMessage('location is required'),

])

const validateLoginUser=validation([body('email').notEmpty().withMessage('provide email').isEmail().withMessage('enter valid email'),
    body('password').notEmpty().withMessage('provide password')
])

const validateAdmin=async(req,res,next)=>{
    const currentJobUser=await userModel.findOne({_id:req.user.userId})
    // console.log(currentJobUser);
    if(currentJobUser.role==='admin')
        return next()
    throw new UNAUTHORIZED('Not authorized!!!');
}
module.exports={validateAdmin,validateJob,validateJobParams,validateUser,validateLoginUser}