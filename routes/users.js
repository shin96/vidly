const _ = require('lodash');
const bcrpy = require('bcrypt');
const route = require('express').Router();
const {User, validate} = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

route.post('/', async (req, res) =>{
    
    const { error } = validate(req.body);
    if (error) return res.status(200).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send("user already register");

    user = new User(_.pick(req.body, ['name', 'password', 'email']));
    const salt = await bcrpy.genSalt(10);
    const hashedPass = await bcrpy.hash(req.body.password, salt);
    user.password = hashedPass;
    user = await user.save();
    res.header('x-auth-token', user.genereateUserToken())
       .send(_.pick(user, ['_id', 'name', 'email', 'isAdmin']));
});

route.get('/me', auth, async(req, res)=>{
    const user = await User.findById(req.myUser._id).select('-password');
    res.send(user);
});
module.exports = route;