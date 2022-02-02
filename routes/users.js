const bcrypt = require('bcrypt');
const { User,validateUser } = require('../models/user');
const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const asyncMiddleware = require('../middleware/asyncMiddleware');

router.post('/', asyncMiddleware(async (req,res) => {
    const result = validateUser(req.body);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }

    let user = await User.findOne({username:req.body.username});
    if(user){
       return res.status(400).send('username already taken....try different username');
    }

    user = await User.findOne({email:req.body.email});
    if(user){
       return res.status(400).send('email already registered');
    }

    user = new User(_.pick(req.body,['email','name','username','password']));

    user.password = await  bcrypt.hash(req.body.password,10);

    try{
        await user.save();
        const token = user.generateAuthToken();
        res.header('x-auth-token',token).send(_.pick(user,['email','name','username']));
    }
    catch(ex){
        for (s in ex.errors){
            res.send(ex.error[s].message);
        }
    }
}));

//router.get('/me',asyncMiddleware(async ()));


module.exports.usersRouter = router ;