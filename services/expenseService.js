const Expense = require('../models/Expense');

const createExpense = function(expenseData) {
    let expense = new Expense({...expenseData});

    return expense.save();
}

const getAll = function(userId) {
    return Expense.find({creator: userId}).lean();
}

const getOne = function (id) {
    return Expense.findById(id);
}

const deleteExpense = function (expenseId) {
    return Expense.deleteOne({_id: expenseId});
}


module.exports = {
    createExpense,
    getAll,
    getOne,
    deleteExpense,
}