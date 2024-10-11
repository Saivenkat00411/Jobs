const fs = require('fs').promises;
const mongoose =require( 'mongoose');
require('dotenv').config()
const path=require('path')
const Job =require( './models/jobModel.js');
const  User =require( './models/userModel.js');

const loaddata=async()=>{
try {
  await mongoose.connect(process.env.MONGO_URI);
  // const user = await User.findOne({ email: 'john@gmail.com' });
  const user = await User.findOne({ email: 'badri@gmail.com' });

  let jsonJobs = await fs.readFile(path.join(__dirname, './utils/MOCK_DATA-5.json'), 'utf8')
   jsonJobs = JSON.parse(jsonJobs);
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });
  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log('Success!!!');
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}}

loaddata()