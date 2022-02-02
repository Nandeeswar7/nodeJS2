const Joi = require('joi');
const mongoose = require('mongoose');

function validatePost(post){
    schema = Joi.object({
        title: Joi.string().min(1).max(15).required(),
        content: Joi.string().min(15).max(255).required(),
    });
    return schema.validate(post);
}

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        minlength:1,
        maxlength:15,
        required:true
    },
    content:{
        type:String,
        minlength:15,
        maxlength:255,
        required:true
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

const Post = mongoose.model('Post',postSchema);

module.exports.Post = Post;
module.exports.validatePost = validatePost;