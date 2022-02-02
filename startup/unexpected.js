const { logger } = require('./logging');

module.exports = function(){
    process.on('uncaughtException',(ex)=>{
        logger.error(ex.stack);
    });
    process.on('unhandledRejection',(ex)=>{
        console.log(ex);
        logger.error(ex);
    });
}