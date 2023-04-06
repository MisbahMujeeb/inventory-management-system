const User = require('../Models/AuthModels')
const jwt = require('jsonwebtoken')

module.exports.checkUser = (req , res , next ) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token , 'inventory app',async (err ,decodedToken) => {
            if(err){
                res.json({status:false});
                next();
            }else{
                const user = await User.findById(decodedToken.id);
                if(user) res.json({status : true , user:user ,uId: user._id});
                else res.json({status: false});
                next();
            }
        })
    }else{
        res.json({status:false});
        next();
    }
}