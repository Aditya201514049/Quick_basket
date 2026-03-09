const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const validateRegister = (req, res, next) => {
    const { name, email, password } = req.body;
    
    if (!name || name.trim().length < 2) {
        return res.status(400).json({
            success: false,
            message: "Name must be at least 2 characters"
        });
    }
    
    if (!email || !email.includes('@') || !email.includes('.')) {
        return res.status(400).json({
            success: false,
            message: "Valid email is required"
        });
    }
    
    if (!password || password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters"
        });
    }
    
    next(); // Continue to controller
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !email.includes('@') || !email.includes('.')){
        return res.status(400).json({
            success: false,
            message: "Valid email is required to enter"
        });
    }

    if(!password){
        return res.status(400).json({
            success: false,
            message: "Please enter password"
        });
    }
    next();
};

const authenticate = async(req, res, next) =>{
    try{
        const token = req.header('Authorization')?.replace('Bearer ','');

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Access denied Login required"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }

        req.user = user;
        next();
    } catch(error){
        res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};

const authorize = (...roles) =>{
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                success: false,
                message: "Access denied, Insufficient permissions"
            });
        }
        next();
    };
};

module.exports = {
    validateRegister,
    validateLogin,
    authenticate,
    authorize
};