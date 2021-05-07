const router = require('express').Router();  
const expenseService = require('../services/expenseService');

router.get('/', (req, res) => {

    if (req.user) {
        expenseService.getAll(req.user._id)
        .then(expenses => {
            res.render('home', {expenses});
        });
    } else {
        res.render('home');
    }
})


module.exports = router;