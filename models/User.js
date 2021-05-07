const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SECRET, SALT_ROUNDS } = require('../config/config');

const userScheme = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    amount: {
        type: Number,
        required: true,
        default: 0,
    },
    expenses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Expense',
    }]
});

userScheme.pre('save', function (next) {
    bcrypt.genSalt(SALT_ROUNDS)
        .then(salt => bcrypt.hash(this.password, salt))
        .then(hash => {
            this.password = hash;
            next();
        });
})


module.exports = mongoose.model('User', userScheme);