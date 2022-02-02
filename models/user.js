const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const mongoose = require('mongoose');

function validateUser(user){
    schema = Joi.object({
        email: Joi.string().max(255).email().required(),
        name: Joi.string().min(5).max(255).required(),
        username: Joi.string().min(5).max(255).required(),
        password:passwordComplexity()
    });
    return schema.validate(user);
}

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    },
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    },
    username:{
        type:String,
        required:true,
        maxlength:255
    },
    password : {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
});

userSchema.methods.generateAuthToken = function(){
    return jwt.sign({_id:this._id,username:this.username,name:this.name},config.get('jwtPrivateKey'));
}

const User = mongoose.model('User',userSchema);

module.exports.User = User;
module.exports.validateUser = validateUser;