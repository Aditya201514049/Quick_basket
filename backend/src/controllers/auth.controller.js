const authService = require('../services/auth.service');


const register = async(req, res) =>{
    try{

        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                mesagge: "Please provide name, email and password"
            });
        }

        const user = await authService.registerUser({name, email, password});

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {user}
        });


    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    register
}