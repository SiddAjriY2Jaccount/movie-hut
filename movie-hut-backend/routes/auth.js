const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const User = require('../models/user.model');
const { auth } = require('../middleware/requireLogin');

const router = express.Router();

// adding new user (sign-up route)
router.post('/register', (req,res) => {
    
    const newuser = new User(req.body);
     
    User.findOne({email: newuser.email},function(err,user){
        if(user) return res.status(400).json({ auth : false, message :"Email ID exists" });
 
        newuser.save((err,doc)=>{
            if(err) {console.log(err);
                return res.status(400).json({ success : false });}
            res.status(200).json({
                succes:true,
                user : doc
            });
        });
    });
 });


// login user
router.post('/login', function(req,res) {
    let token = req.cookies.auth;
    
    User.findByToken(token,(err,user)=>{
        if(err) return  res(err);
        if(user) return res.status(400).json({
            error : true,
            message: "You are already logged in"
        });
    
        else{
            User.findOne({'email':req.body.email}, function(err,user){
                if(!user) return res.json({ isAuth : false, message : "Auth failed, email not found" });
        
                user.comparepassword(req.body.password,(err,isMatch)=>{
                    if(!isMatch) return res.json({ isAuth : false, message : "Password doesn't match"});
        
                user.generateToken((err,user)=>{
                    if(err) return res.status(400).send(err);
                    res.cookie('auth',user.token).json({
                        isAuth : true,
                        id : user._id,
                        email : user.email
                    });
                });    
            });
          });
        }
    });
});

// access protected route
router.get('/profile', auth, function(req,res) {
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        name: req.user.name        
    })
});

//logout user
router.get('/logout',auth, function(req,res) {
    req.user.deleteToken(req.token, (err,user) => {
        if(err) return res.status(400).send(err);
        res.sendStatus(200);
    });
}); 
