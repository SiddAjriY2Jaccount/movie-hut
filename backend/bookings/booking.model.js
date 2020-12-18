const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    bookedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
     },
    movieBooked: {
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    },
    seats: { 
        type: Number, 
        required: true 
    },
    ticket_price: { 
        type: Number, 
        required: true 
    },
    total_price: { 
        type: Number, 
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

module.exports = mongoose.model('Booking', schema);