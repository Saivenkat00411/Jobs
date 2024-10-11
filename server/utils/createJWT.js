const jwt=require('jsonwebtoken')

const createJWT=(payload)=>{
    const token=jwt.sign(payload,process.env.SECRET,{expiresIn:process.env.EXPIRES_IN})
    return token
}

module.exports=createJWT