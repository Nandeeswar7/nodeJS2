const express = require('express');
const app = express();
const { logToConsole } = require('./startup/logging');
//require('./startup/unexpected')();
require('./startup/config')();
require('./startup/db')();
require('./startup/routes')(app);

//throw new Error('uncaught exception');

app.listen(5000,()=>{
    logToConsole.info('listening at port 5000')
});