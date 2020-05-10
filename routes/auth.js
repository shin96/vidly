const _ = require('lodash');
const bcrpy = require('bcrypt');
const route = require('express').Router();
const {User} = require('../models/user');
const Joi = require('joi');


route.post('/', async (req, res) =>{
    
    const { error } = validate(req.body);
    if (error) return res.status(200).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send("user doesn't exist please signup");
    
    // bcrpy.compare(req.body.password, user.password, (err, valid) => {
    //     if(!valid) 
    //         return res.status(400).send("incorrect username or password");
    //     return res.status(200).send(user);
    // });

    let valid = await bcrpy.compare(req.body.password, user.password);
    if (!valid) return res.status(400).send("incorrect username or password");
    
    return res.status(200).send(user.genereateUserToken());

});


function validate(req) {

    const joiUserSchema = {
        email: Joi
            .string()
            .min(5)
            .required()
            .email(),

        password: Joi
                .string()
                .required()
                .min(6),
    };

    return Joi.validate(req, joiUserSchema);
}

module.exports = route;