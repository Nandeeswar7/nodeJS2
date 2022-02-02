const winston = require('winston');
const { combine, timestamp, prettyPrint } = winston.format;



const logToConsole = winston.createLogger(
    {
        //format: winston.format.errors({ stack: true }),
        transports:[
            new winston.transports.Console()
        ]
    }
);

const logger = winston.createLogger(
    {
        transports:[
            new winston.transports.File({filename:'error.log'}),
            new winston.transports.Console()
        ]
    }
);

module.exports.logToConsole = logToConsole;
module.exports.logger = logger;