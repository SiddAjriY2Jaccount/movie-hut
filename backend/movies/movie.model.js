const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    image_url: { 
        type: String, 
        //required: true 
    },
    language: { 
        type: String, 
        required: true 
    },
    genre: { 
        type: String, 
        required: true 
    },
    director: { 
        type: String, 
        required: true 
    },
    cast: { 
        type: String, 
        required: true 
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

module.exports = mongoose.model('Movie', schema);