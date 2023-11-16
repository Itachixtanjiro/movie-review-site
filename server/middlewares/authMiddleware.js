const jwt = require('jsonwebtoken')
module.exports=(req,res,next)=>{
    try {
        if (!authorizationHeader) {
            throw new Error('Authorization header missing');
        }
        const token= req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'Token missing in Authorization header', success: false });
        }
        const decryptedToken= jwt.verify(token,process.env.jwt_secret);
        req.userId= decryptedToken.userId;
        next();
    } catch (error) {
        res.status(401).json({message:error.message, success:false});
    }
};