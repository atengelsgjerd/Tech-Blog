

const router = require('express').Router();


const User = require('../models/User');

router.get('/', async (req, res) => {
    res.render('home');
});

router.get('/login', async (req, res) => {
    res.render('login');
});

router.get('/signup', async (req, res) => {
    res.render('signup');
});

router.post('/api/signup', async (req, res)=> {
    console.log(req.body);
    const userData = await User.create(req.body);
    res.status(200).json(userData);
});

module.exports = router;