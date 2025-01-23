const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require("../errors");

const auth = async(req, res, next) => {
    //check header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid');
    }
    const token = authHeader.split('Bearer ')[1];
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        //attach user to the activity routes
        /*const user = User.findOne(payload.id).select('-password');
        req.user = user;*/
        req.user = {userId: payload.userId, name: payload.name};
        next();
    }catch(err){
        throw new UnauthenticatedError('Authentication invalid');
    }
}

module.exports = auth;