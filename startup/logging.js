require('express-async-errors');
const winston = require('winston');

module.exports = function() {

    winston.add(new winston.transports.File({ filename: 'logfile.log' }));

    process.on('unhandledRejection', (ex)=>{
        console.log("ERRoR-unhadledRejections", ex.message);
    } );

    process.on('uncaughtException', (ex) => {
        console.log("ERRoR-uncaughtExceptions", ex.message);
    });
};