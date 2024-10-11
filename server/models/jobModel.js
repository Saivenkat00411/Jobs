const mongoose=require('mongoose');
const { JOBSTATUS, JOBTYPE } = require('../utils/jobConstants');
const { method } = require('lodash');
const jobSchema = new mongoose.Schema(
    {
      company: String,
      position: String,
      jobStatus: {
        type: String,
        enum: Object.values(JOBSTATUS),
        default: JOBSTATUS.PENDING,
      },
      jobType: {
        type: String,
        enum: Object.values(JOBTYPE),
        default: JOBTYPE.FULLTIME,
      },
      jobLocation: {
        type: String
      },
      createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'userModel'
      }
    },
    { timestamps: true }
  );

  
  const jobModel=mongoose.model('jobmodel',jobSchema)

  module.exports=jobModel;