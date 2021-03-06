const mongoose = require('mongoose');

const expenseScheme = new mongoose.Schema({
    merchant: {
        type: String,
        required: true,   
        minlength: 4, 
    },
    total: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true, 
        minlength: 3,
        maxlength: 30
    },
    report: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});


module.exports = mongoose.model('Expense', expenseScheme);