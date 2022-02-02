const { logger } = require('../startup/logging');

module.exports = function(err,req,res,next){
    logger.error(err,err.message);
    res.status(500).send('something failed');
}