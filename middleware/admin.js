
module.exports = function(req, res, next) {

    if(!req.myUser.isAdmin) return res.status('403').send('you are not authorized to access');
    next();

};