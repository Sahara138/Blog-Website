var jwt = require('jsonwebtoken');

const verifyToken=(req,res,next) =>{
    const token = req.cookies.jwtToken
    if(!token){
        res.status(401).json("You are not authenticated!")
    }
    jwt.verify(token,process.env.SECRET,async(err,data)=>{
        if(err){
            res.status(403).json("Token is not valid!")
        }
        res.userId = data._id
        next()
    })
}

module.exports = verifyToken