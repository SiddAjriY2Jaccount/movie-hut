const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    image_url: { 
        type: String, 
        default: "https://blog.rahulbhutani.com/wp-content/uploads/2020/05/Screenshot-2018-12-16-at-21.06.29.png" 
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
    description: {
        type: String, 
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
        //delete ret.password;
    }
});

module.exports = mongoose.model('Movie', schema);