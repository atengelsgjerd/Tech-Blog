

const router = require('express').Router();


const User = require('../models/User');

router.get('/', async (req, res) => {
    res.render('home', {loggedIn: req.session.loggedIn});
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', async (req, res) => {
    res.render('signup');
});

module.exports = router;