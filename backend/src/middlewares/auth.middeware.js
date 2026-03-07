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

module.exports = {
    validateRegister,
    validateLogin
};