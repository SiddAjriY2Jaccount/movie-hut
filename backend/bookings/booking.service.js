const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const movieService = require('../movies/movie.service')
const db = require('_helpers/db');
const Booking = db.Booking;
const Movie = db.Movie;
const User = db.User;


module.exports = {
    //authenticate,
    getAll,
    getById,
    getByUserId,
    create,
    update,
    delete: _delete
};

/* 
async function authenticate({ email, password }) {
    const booking = await booking.findOne({ email });
    if (booking && bcrypt.compareSync(password, booking.password)) {
        const token = jwt.sign({ sub: booking.id }, config.secret, { expiresIn: '7d' });
        return {
            ...booking.toJSON(),
            token
        };
    }
}
 */

async function getAll() {
    return await Booking.find();
}

async function getById(id) {
    return await Booking.findById(id);
}

async function getByUserId(userId) {
    //return await Booking.findById(id);
    return await Booking.find({bookedBy: userId}).populate("movieBooked");
}

async function create(bookingParam) {
    // validate
    /* if (await Booking.findOne({ email: bookingParam.email })) {
        throw 'Email "' + bookingParam.email + '" is already taken';
    } */

    console.log(bookingParam);
    const booking = new Booking(bookingParam);

    // hash password
    /* if (bookingParam.password) {
        booking.password = bcrypt.hashSync(bookingParam.password, 10);
    } */

    // save booking
    const movieObject = await movieService.getById(bookingParam.movieBooked);
    //console.log(movieObject);
    if (movieObject.seats_left >= bookingParam.seats) {
        await booking.save();
        movieObject.seats_left = movieObject.seats_left - bookingParam.seats;
        console.log("inside seats booked or left part");
        //console.log(movieObject);
        movieService.update(movieObject._id, movieObject)
            .then(() => next(res.json({"success": "true"})))
            .catch(err => next(err));
        //console.log("last line");
        return({"success": "truee"});
    }
    else {
        return {"success": "false", "message": "Booking not possible, seats unavailable"};
    }

    // make appropriate change to Movie collection
    return await Booking.findOne({movieBooked: bookingParam.movieBooked}).populate("movieBooked");
        
}

async function update(id, bookingParam) {
    const booking = await Booking.findById(id);

    // validate
    /* if (!booking) throw 'booking not found';
    if (booking.email !== bookingParam.email && await Booking.findOne({ email: bookingParam.email })) {
        throw 'Email "' + bookingParam.email + '" is already taken';
    } */

    // hash password if it was entered
    /* if (bookingParam.password) {
        bookingParam.password = bcrypt.hashSync(bookingParam.password, 10);
    } */

    // copy bookingParam properties to booking
    Object.assign(booking, bookingParam);

    await booking.save();
    
}

async function _delete(id) {
    await Booking.findByIdAndRemove(id);
}