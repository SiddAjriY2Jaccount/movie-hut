const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    seats: { 
        type: String, 
        required: true 
    },
    ticket_price: { 
        type: Number, 
        required: true 
    },
    seats: { 
        type: Number, 
        required: true 
    },
    seats_available: { 
        type: Boolean  
    },
    image_url: { 
        type: String  
    },
    movies: [{
        type: Schema.Types.ObjectId,
        ref: 'Movie'
     }],
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

module.exports = mongoose.model('Hall', schema);