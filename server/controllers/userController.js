const { StatusCodes } = require('http-status-codes');
const usermodel = require('../models/userModel');
const { BAD_REQUEST, NOT_FOUND_ERROR, UNAUTHENTICATED } = require('../errors/customError');
const bcrypt = require('bcryptjs');
const {promises} = require('fs')
const cloudinary=require('cloudinary')
const createJWT = require('../utils/createJWT');
const userModel = require('../models/userModel');
const register = async (req, res) => {

    const noOfdocuments = await usermodel.countDocuments()
    noOfdocuments === 0 ? req.body.role = 'admin' : req.body.role = 'user';
    const isEmailExists = await usermodel.findOne({ email: req.body.email });
    if (isEmailExists) {
        throw new BAD_REQUEST('Email Already exists');
    }
    const user = await usermodel.create(req.body);
    if (!user)
        throw new BAD_REQUEST('User Not Created')
    // const token=createJWT({name:user.name,email:user.email})
    // res.cookie('jwtToken',token,{httpOnly:true,expiresIn:process.env.EXPIRES_IN,secure:process.env.NODE_ENV==='production'})
    res.status(StatusCodes.CREATED).json({ user });
}
const login = async (req, res) => {
    const user = await usermodel.findOne({ email: req.body.email });
    if (!user)
        throw new NOT_FOUND_ERROR('User Not Found')
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordCorrect)
        throw new UNAUTHENTICATED('enter correct password');
    const token = createJWT({ userId: user._id, name: user.name, email: user.email })
    res.cookie('jwtToken', token, { httpOnly: true, expiresIn: process.env.EXPIRES_IN, secure: process.env.NODE_ENV === 'production' })
    res.status(StatusCodes.OK).json({ msg: 'login' });
}
const logOut = async (req, res) => {
    res.cookie('jwtToken', 'logout', { httpOnly: true, expiresIn: new Date(Date.now()) });
    res.status(StatusCodes.OK).json({ msg: 'User LoggedOut' });
}

const getCurrentUser = async (req, res) => {
    const current = await userModel.findOne({ _id: req.user.userId }).select('-password');
    if (!current) throw new BAD_REQUEST('authentication failed!!!');
    res.status(StatusCodes.OK).json({ current });
}

const getApplicationStats = async (req, res) => {
    console.log('statts user')
    

}

const updateUser = async (req, res) => {
    const newUser={...req.body};
    if(req.file)
    {
        const response=await cloudinary.v2.uploader.upload(req.file.path);
        await promises.unlink(req.file.path);
        newUser.avatar=response.secure_url
        newUser.avatarPublicId=response.public_id;
    }
    const updatedUser = await userModel.findByIdAndUpdate(req.user.userId, newUser);
    if(req.file && updateUser.avatarPublicId)
    {
        await cloudinary.v2.uploader.destroy(updateUser.avatarPublicId)
    }
    // console.log(req.file);
    res.status(StatusCodes.OK).json({ updatedUser });

}
module.exports = { register, login, logOut, getCurrentUser, getApplicationStats, updateUser };