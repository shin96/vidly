
const {User} = require('../../../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('config');

describe('user.GenerateAuthToken', () => {
    it('should return a valid JWT', ()=>{

        const payload = {
            _id: mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        };
        
        const user = new User(payload);

        const token = user.genereateUserToken();
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));

        expect(decoded).toMatchObject(payload);

    });
});