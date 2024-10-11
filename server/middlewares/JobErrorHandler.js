const { StatusCodes } = require("http-status-codes")

const JobErrorHandler=(err, req, res, next) => {
    // console.log(err);
    const statuscode=err.StatusCode||StatusCodes.INTERNAL_SERVER_ERROR
    const msg=err.message||'something went wrong!!!1'
    res.status(statuscode).json({ message: msg })
}

module.exports=JobErrorHandler