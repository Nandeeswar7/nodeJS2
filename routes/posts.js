const express = require('express');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const router = express.Router();
const { Post } = require('../models/post');
const { validatePost } = require('../models/post');
const _ = require('lodash');
const ifLoggedin = require('../middleware/ifLoggedin');

router.get('/',asyncMiddleware(async (req,res)=>{
    const posts = await Post.find();
    if(posts.length==0){
        return res.send('no posts found');
    }
    res.send(posts);
}));

router.post('/',ifLoggedin,asyncMiddleware(async (req,res)=>{
    const result = validatePost(req.body);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }
    const post = new Post({
        title:req.body.title,
        content:req.body.content,
        userID:req.user._id
    })
    try{
        const saved = await post.save();
        res.send(_.pick(saved,['title','content']));
    }
    catch(ex){
        for(s in ex.errors){
            res.status(400).send(ex.errors[s].message);
        }
    }
}));

router.put('/:id',ifLoggedin,asyncMiddleware(async (req,res)=>{

    const postID = req.params.id;
    const post = await Post.findById(postID);
    if (post.userID.toString() == req.user._id){
        result = validatePost(req.body);
        if(result.error){
            return res.status(400).send(result.error.details[0].message);
        }
        try{
            const saved = await Post.findByIdAndUpdate(postID,{
                title:req.body.title,
                content:req.body.content,
                userID:req.user._id
            },{ new:true });
            return res.send(_.pick(saved,['title','content']));
        }
        catch(ex){
            for(s in ex.errors){
                return res.status(400).send(ex.errors[s].message);
            }
        }
    }
    return res.status(403).send("access denied");
}));


module.exports = router;