const router = require('express').Router();
const expenseService = require('../services/expenseService');

router.get('/create', (req, res) => {
    res.render('createExpense');
});

router.post('/create', (req, res, next) => {
    
    let { merchant, total, vault, category, description, report } = req.body;
    report = report == 'on'
   
    let expenseData = {
        merchant,
        total, 
        vault, 
        category, 
        description,
        report,
        creator: req.user._id,
    }

    expenseService.createExpense(expenseData)
        .then(createdExpense => {
            res.redirect('/');
        })
        .catch(next) 
})


router.get('/:expenseId/report', (req, res, next) => {
    
    let id = req.params.expenseId;

    expenseService.getOne(id)
        .then(expense => {
            res.render('report', expense);
        })
        .catch(next)
    
    
});


router.get('/:expenseId/delete', (req, res, next) => {
    let id = req.params.expenseId;
    expenseService.deleteExpense(id)
        .then(() => {
            res.redirect('/');
        })
        .catch(next)
    
   
    
});



module.exports = router;
