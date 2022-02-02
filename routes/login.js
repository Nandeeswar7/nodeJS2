const bcrypt = require('bcrypt');
const Joi = require('joi');
const { User } = require('../models/user');
const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const passwordComplexity = require('joi-password-complexity');

function validateLogin(user){
    schema = Joi.object({
        "username or email": Joi.string().min(5).max(255).required(),
        password: passwordComplexity().required()
    });
    return schema.validate(user);
}

router.post('/',asyncMiddleware( async (req,res) => {
    const result = validateLogin(req.body);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }
    let user = await User.findOne().or([{email:req.body["username or email"]},{username:req.body["username or email"]}]);
    if(!user){
        return res.status(400).send("Invalid username or email or password");
    }
    const validatePassword = await bcrypt.compare(req.body.password,user.password);
    if(!validatePassword){
        return res.status(400).send("invalid username or email or password");
    }

    const token = user.generateAuthToken();
    res.send(token);
}));

module.exports.loginRouter = router;