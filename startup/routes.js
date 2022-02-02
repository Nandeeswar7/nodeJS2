const express = require('express');
const error = require('../middleware/error');
const { loginRouter } = require('../routes/login');
const { usersRouter } = require('../routes/users');
const postsRouter = require('../routes/posts');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/users',usersRouter);
    app.use('/api/login',loginRouter);
    app.use('/api/posts',postsRouter);
    //app.use(error);
}
