const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const registerUser = async(userData) =>{
    const {name, email, password, role} = userData;

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
        password: hashedPassword,
        role
    });

    await newUser.save();

    //return the new created user without the password

    const userResponse = newUser.toObject();
    delete userResponse.password;

    return userResponse;


};

const jwt = require('jsonwebtoken');

const loginUser = async(userData) =>{
    const {email, password} = userData;

    const user = await User.findOne({email});
    if(!user){
        throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    );

    const userResponse = user.toObject();
    delete userResponse.password;

    return {user: userResponse, token};
}

module.exports = {
    registerUser,
    loginUser
};