require('dotenv').config()
require('express-async-errors');
const express = require('express')
const morgan = require('morgan');
const router = require('./routes/router')
const userRouter = require('./routes/userRoutes')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const path = require('path')
const connectDB = require('./database/db');
const JobErrorHandler = require('./middlewares/JobErrorHandler');
const authenticationMiddleware = require('./middlewares/authMiddleware');
const cloudinary = require('cloudinary')
const app = express();

const jobs = [{ id: '1', company: 'apple', position: 'sde' },
{ id: '2', company: 'samsung', position: 'tester' }
]
if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})
app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.json())
app.use(cookieParser())

// app.get('/', (req, res) => {
//     res.send('hello')
// })

// app.get('/api/v1/test', (req, res) => {
//     res.json({ msg: 'test route' });
//   });

app.use('/api/v1/user', userRouter)
app.use('/api/v1/jobs',  authenticationMiddleware,router);

app.use('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname, './public','index.html'))
})

app.use('*', (req, res) => {
    res.status(404).json({ msg: 'route not existe' });
})


app.use(JobErrorHandler)


const PORT = process.env.PORT
const connection = async () => {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => {
        console.log(`server running....${PORT}`);
    });
}
connection()