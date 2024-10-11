const jwt=require('jsonwebtoken')
const verifyJWT=(token)=>{
    const payload= jwt.verify(token,process.env.SECRET);
    return payload
}

module.exports=verifyJWT