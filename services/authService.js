const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');

const register = (username, password, repeatPassword, amount) => {

    if(password != repeatPassword) {
        throw {message: 'Passwords should match', status: 404};
    }

    let user = new User({ username, password, amount });

    return user.save();
}

const login = async (username, password) => {
    let user = await User.findOne({username})
    if(!user) throw {message: 'User doesn\'t exist', status: 404};
    
    let areEqual = await bcrypt.compare(password, user.password);    
    if(!areEqual) throw {message: 'Wrong password', status: 404};

    let token = jwt.sign({_id: user._id, username: user.username}, SECRET)
    return token;
}

const refill = async function (userId, newAmount) {
    newAmount = +newAmount;

    await User.find({_id: userId}, (err, data) => {
        newAmount += Number(data[0].amount)
    })

    return User.update({ _id: userId }, {amount: newAmount}, {new: true});
}

module.exports = {
    register,
    login,
    refill,
}