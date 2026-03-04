const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const registerUser = async(userData) =>{
    const {name, email, password} = userData;

    //user already available or not
    const existingUser = await User.findOne({ email });
    if(existingUser){
        throw new Error("User already exists with this email");
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });

    await newUser.save();

    //return the new created user without the password

    const userResponse = newUser.toObject();
    delete userResponse.password;

    return userResponse;


};

module.exports = {
    registerUser
};