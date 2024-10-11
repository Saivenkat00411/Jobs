const { BAD_REQUEST, UNAUTHORIZED } =require( "../errors/customError")

const checkTestUser=async(req,res,next)=>{
    if(req.user.testUser)
        throw new UNAUTHORIZED('Only ReadOnly')
    next()
}

module.exports=checkTestUser