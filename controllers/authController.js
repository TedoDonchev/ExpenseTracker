const router = require('express').Router();
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');



//////////////////////////////////////////////
router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    authService.login(username, password)
        .then(token => {
            res.cookie(COOKIE_NAME , token, {httpOnly: true});
            res.redirect('/');
        })
        .catch(err => {
            next(err);
        });
    
})
//////////////////////////////////////////////

router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register', (req, res, next) => {
    
    const { username, password, repeatPassword, amount } = req.body

    authService.register(username, password, repeatPassword, amount)
    .then(createdUser =>{
        authService.login(username, password)
            .then(token => {
            
            res.cookie(COOKIE_NAME , token, {httpOnly: true});
            res.redirect('/');
        })
        .catch(err => {
            next(err);
        });   

    }) 
    .catch(err => next(err));

});
//////////////////////////////////////////////

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
})

router.get('/account', (req, res) => {
    res.render('/accountInfo');
})



router.post('/refill', (req, res, next) => {
        let userId = req.user._id;
        let amount = req.body.addAmount;
        
        authService.refill(userId, amount)
            .then(() => { 
                
                res.redirect('/');
            })
            .catch(next)
    })




module.exports = router;


