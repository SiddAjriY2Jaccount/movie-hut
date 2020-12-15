const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { 
        type: String, 
        unique: true, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    },
    createdDate: { 
        type: Date, 
        default: Date.now 
    }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
    }
});

module.exports = mongoose.model('User', schema);