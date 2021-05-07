const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const expenseController = require('./controllers/expenseController');




router.use('/', homeController);
router.use('/auth', authController);
router.use('/expense', expenseController);



router.get('*', (req, res) => {
    res.render('404');
})





module.exports = router;