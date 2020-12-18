const express = require('express');
const router = express.Router();
const bookingService = require('./booking.service');
const movieService = require('../movies/movie.service');
const userService = require('../users/user.service');


// routes
//router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/user/:userId', getByUserId);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

/* 
function authenticate(req, res, next) {
    bookingService.authenticate(req.body)
        .then(booking => booking ? res.json(booking) : res.status(400).json({ message: 'Email or password is incorrect' }))
        .catch(err => next(err));
}
 */

function register(req, res, next) {
    console.log(req.body);
    req1 = req.body;
    req1.total_price = req1.ticket_price * req1.seats;
    bookingService.create(req1)
        .then((booking) => {
            console.log(booking);
            res.json(booking);
        })
            
/*             movieService.getById(req1.movieBooked)
                .then((res) => {
                    if ((res.seats_left - req1.seats) > 0) {
                        res.seats_left = res.seats_left - req1.seats;
                        movieService.update(req1.movieBooked, res)
                            .then(next({"success": "true"}))
                            .catch(err => next(err));    

                    }

                    else {
                        next({"success": "false"});
                    }
                    //console.log(res);
                })
                .catch(err => next(err));

            res.json({"success": "true"});
 */         
        .catch(err => next(err));
}

function getByUserId(req, res, next) {
    bookingService.getByUserId(req.params.userId)
        .then(bookings => res.json(bookings))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    bookingService.getAll()
        .then(bookings => res.json(bookings))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    bookingService.getById(req.booking.sub)
        .then(booking => booking ? res.json(booking) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    bookingService.getById(req.params.id)
        .then(booking => booking ? res.json(booking) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    bookingService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    bookingService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

