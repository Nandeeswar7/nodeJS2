const mongoose = require('mongoose');
const { logToConsole } = require('./logging');

module.exports = function(){
    mongoose.connect('mongodb://localhost/nodeJS-project',{ useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>logToConsole.info('CONNECTED TO DATABASE'))
}