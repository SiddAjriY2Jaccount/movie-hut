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

// PRE - FUNCTION
// encrypt password before save
userSchema.pre('save', function(next) {
    
    var user = this;

    //console.log(user);
    
    if(user.isModified('password'))
    {
        bcrypt.genSalt(saltingRounds, function(err, saltingRounds){
            if(err)return next(err);

            bcrypt.hash(user.password, saltingRounds, function(err,hash){
                if(err) return next(err);
                user.password=hash;
                next();
            })

        })
    }

    else
    {
        next();
    }
  
});

// method to check if entered password is same as that in database
userSchema.methods.comparepassword = function(password,cb){
    bcrypt.compare(password, this.password, function(err, isMatch){
        if(err) return cb(next);
        cb(null,isMatch);
    });
}

// generate token
userSchema.methods.generateToken = function(cb) {
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

    jwt.verify(token, JWT_SECRET, function(err,decode){
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