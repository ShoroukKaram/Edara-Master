const {auth} = require("mysql/lib/protocol/Auth");
const adminAuth = (req,res,next) =>{
    const {type} = req.headers;
    let authorization = req.headers.authorization;
    // if(type == 'admin') next();

    if(authorization == 1 ) next();
    else{
        res.statusCode = 403;
        res.send({
            message : "you are not authorized to access this route",
        })
    }
}

module.exports = adminAuth;