const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkJwt = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({ message: 'No token provided' });
    }
    else{
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        }catch(err){
            console.error('JWT verification error:', err);
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
}

module.exports = checkJwt;