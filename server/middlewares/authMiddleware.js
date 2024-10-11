const { UNAUTHENTICATED } = require("../errors/customError");
const verifyJWT = require("./verifyJWI");

const authenticationMiddleware=async(req,res,next)=>{
    // console.log(req.cookies);
    const {jwtToken}=req.cookies;
    if(!jwtToken)throw new UNAUTHENTICATED('authentication failed')
    const payload=verifyJWT(jwtToken);
    if(payload.userId==='66fd8a87e2f88e47396e53e1')
        payload.testUser=true;
    else
        payload.testUser=false;
    if(!payload) throw new UNAUTHENTICATED('authentication failed')
    req.user=payload
    next();
}

module.exports=authenticationMiddleware