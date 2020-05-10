const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 255,
        require: true
    },

    email: {
        type: String,
        min: 5,
        max: 255,
        require: true,
        unique: true
    },

    password: {
        type: String,
        min: 6,
        max: 1024,
        require: true
    },

    isAdmin: Boolean

});

//we need to have a method in the model that can give us the required JWT token 
//and to in node we create model using schema so we need to add a function as a key value pair in userSchemna

userSchema.methods.genereateUserToken = function() {
    return jwt.sign(_.pick(this, ['_id', 'isAdmin']), config.get('jwtPrivateKey'));
};

const user = mongoose.model('User', userSchema);

function validateUser(user) {

    const joiUserSchema = {
        name: Joi
            .string()
            .required()
            .min(5)
            .max(255),
        
        email: Joi
            .string()
            .min(5)
            .required()
            .email(),

        password: Joi
                .string()
                .required()
                .min(6),
        // isAdmin: Joi.boolean(),
    };

    return Joi.validate(user, joiUserSchema);
}



module.exports.User = user;
module.exports.validate = validateUser;