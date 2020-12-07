const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltingRounds = 10;
const { JWT_SECRET } = require('../keys');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin'],
    },
    token: {
        type: String
    }  
});

// PRE - FUNCTIONS
// encrypt password before save
userSchema.pre('save', (next) => {
    
    const user = this;
    
    if(!user.isModified || !user.isNew) { 
    // don't rehash if it's an old user
      next();
    } 
    
    else {
      bcrypt.hash(user.password, saltingRounds)
        .then((err, hash) => {
            if (err) {
                console.log('Error hashing password for user with E-mail ', user.email);
                next(err);
              } 
              
              else {
                user.password = hash;
                next();
              }
            }

        )
        .catch((err) => console.error(err));         
    }
  });

// method to check is password is same as existing user's
userSchema.methods.comparepassword = (password, cb) => {
    bcrypt.compare(password,this.password,function(err,isMatch){
        if(err) return cb(next);
        cb(null, isMatch);
    });
}

// generate token
userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(), JWT_SECRET);

    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}

// find by token
userSchema.statics.findByToken = function(token,cb){
    var user=this;

    jwt.verify(token,confiq.SECRET,function(err,decode){
        user.findOne({"_id": decode, "token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user);
        })
    })
};

//delete token
userSchema.methods.deleteToken=function(token,cb){
    var user=this;

    user.update({$unset : {token: 1}}, function(err,user) {
        if(err) return cb(err);
        cb(null,user);
    })
}


const User = mongoose.model("User", userSchema);
module.exports = User;