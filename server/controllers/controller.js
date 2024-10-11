const random = require('lodash');
const express = require('express')
const app = express();
const day = require('dayjs')
const jobModel = require('../models/jobModel');
const { StatusCodes } = require('http-status-codes')
const { default: mongoose } = require('mongoose');
const { NOT_FOUND_ERROR, BAD_REQUEST, UNAUTHENTICATED, UNAUTHORIZED } = require('../errors/customError');
const userModel = require('../models/userModel');
// let jobs = [{ id: '1', company: 'apple', position: 'sde' },
// { id: '2', company: 'samsung', position: 'tester' }
// ]

const getUserJobs = async (req, res) => {
    const users = await userModel.countDocuments()
    const jobs = await jobModel.countDocuments()
    res.status(StatusCodes.OK).json({ users, jobs })

}
const getAllJobsAdmin = async (req, res) => {
    const jobs = await jobModel.find({});
    console.log(jobs);
    res.status(StatusCodes.OK).json({ jobs })
}
//getAllJobs
const getAllJobs = async (req, res) => {
    let queryObject = {
        createdBy: req.user.userId
    }
    const { search, jobstatus, jobtype, sort } = req.query;
    let temp = 'newest'
    if (search && search !== ' ') {
        queryObject.$or = [{ position: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },]


    }
    // console.log(queryObject)
    if (jobstatus && jobstatus !== 'all') {
        queryObject.jobStatus = jobstatus
    }
    if (jobtype && jobtype !== 'all') {
        queryObject.jobType = jobtype
    }
    if (sort) {

        if (sort === 'newest') {
            temp = '-createdAt'
        }
        if (sort === 'oldest') {
            temp = 'createdAt'
        }
        if (sort === 'a-z') {
            temp = 'position'
        }
        if (sort === 'z-a') {
            temp = '-position'
        }
    }
    const page = Number(req.query.page) || 1;
    const limit = 3;
    const skip = (page - 1) * limit;
    const jobs = await jobModel.find(queryObject).sort(temp).skip(skip).limit(limit)
    console.log(jobs);
    const totalJobs = await jobModel.countDocuments(queryObject)
    const numOfPages = Math.ceil(totalJobs / limit)
    // console.log(totalJobs)
    res.status(StatusCodes.OK).json({ totalJobs, numOfPages, currentPage: page, jobs })
    // res.status(StatusCodes.OK).json({ jobs })

}

//create a Job
const createJob = async (req, res) => {
    const { company, position, jobStatus, jobType, jobLocation } = req.body;
    if (!company || !position) {
        throw new BAD_REQUEST('Provide all details')
    }
    // const id = random.random(0, 100)
    // const job = { id, company, position }
    // jobs.push(job);
    //console.log(id);
    // console.log(req.user)
    const user = req.user.userId
    if (!user) throw new UNAUTHORIZED('Authorization failed')
    const createdJob = await jobModel.create({ company, position, jobStatus, jobLocation, jobType, createdBy: user })
    if (!createdJob) {
        throw new UNAUTHENTICATED('Job Not Created')
    }
    res.status(StatusCodes.CREATED).json({ createdJob });
}

//findSinggleJob
const getSinglejob = async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    // const isJobExists = jobs.find((job) => job.id === id)
    const isJobExists = await jobModel.findOne({ _id: id })

    if (!isJobExists) {
        throw new NOT_FOUND_ERROR('Job Not found')
        //throw new Error('Job not found');
    }
    res.status(StatusCodes.OK).json({ isJobExists })
}

//update
const updatedJob = async (req, res) => {
    const { company, position, jobStatus, jobType, jobLocation } = req.body;
    console.log(req.body);
    const { id } = req.params;
    const isJobExists = await jobModel.findOne({ _id: id })
    if (!isJobExists) {
        throw new NOT_FOUND_ERROR('Job not found');
    }
    const updatedFields = {
        ...(company && { company }),
        ...(position && { position }),
        ...(jobLocation && { jobLocation }),
        ...(jobStatus && { jobStatus }),
        ...(jobType && { jobType })
    };
    Object.assign(isJobExists, updatedFields);
    await isJobExists.save();
    res.status(StatusCodes.OK).json({ msg: 'job modified', isJobExists });

}
const showStats = async (req, res) => {
    // console.log(req.user);
    let stats = await jobModel.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: '$jobStatus',
                jobStatuscount: {
                    $sum: 1
                }
            }
        }
    ])
    // console.log(stats);
    stats = stats.reduce((acc, cur) => {
        const { _id, jobStatuscount } = cur;
        acc[_id] = jobStatuscount;
        return acc;
    }, {})
    // console.log(stats);

    let monthlyApplications = await jobModel.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: {
                    year: {
                        $year: '$createdAt'
                    },
                    month: {
                        $month: '$createdAt'
                    }
                },
                jobsCount: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                '_id.year': -1,
                '_id.month': -1
            }
        }
    ])
    monthlyApplications = monthlyApplications
        .map((item) => {
            const {
                _id: { year, month },
                jobsCount,
            } = item;

            const date = day()
                .month(month - 1)
                .year(year)
                .format('MMM YY');
            return { date, jobsCount };
        })
        .reverse();
    // console.log(monthlyApplications);
    res.status(StatusCodes.OK).json({ stats, monthlyApplications })


}
//delete
const deleteJob = async (req, res) => {
    const { id } = req.params;
    // const updatedJobsArray = jobs.filter(job => job.id !== id)
    // jobs = updatedJobsArray
    await jobModel.deleteOne({ _id: id });
    res.status(StatusCodes.OK).json({ msg: 'job deleted' });
}

module.exports = { getAllJobsAdmin, showStats, getSinglejob, getAllJobs, getUserJobs, createJob, updatedJob, deleteJob };