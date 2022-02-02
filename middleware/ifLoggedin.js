const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next){
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(403).send('no token found');
    }

    try{
        const decode = jwt.verify(token,config.get('jwtPrivateKey'));
        req.user = decode;
        next();
    }
    catch(ex){
        return res.status(400).send('invalid token');
    }
}