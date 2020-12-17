const express = require('express');
const router = express.Router();
const movieService = require('./movie.service');
const db = require('_helpers/db');
const Movie = db.Movie;


// routes
//router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

/* 
function authenticate(req, res, next) {
    movieService.authenticate(req.body)
        .then(movie => movie ? res.json(movie) : res.status(400).json({ message: 'Email or password is incorrect' }))
        .catch(err => next(err));
}
 */

function register(req, res, next) {
    movieService.create(req.body)
        .then(() => res.json({success: 'true'}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    movieService.getAll()
        .then(movies => res.json(movies))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    movieService.getById(req.movie.sub)
        .then(movie => movie ? res.json(movie) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
/*     console.log(req.params.id);
    Movie.findById(req.params.id)
        .then(movie => {
            if (movie) {
                res.json(movie);
            }
            else {
                res.status(404);
            }
        })
        .catch(err => next(err)); */

    movieService.getById(req.params.id)
        .then(movie => movie ? res.json(movie) : res.sendStatus(404))
        .catch(err => next(err));
    
}

function update(req, res, next) {
    movieService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    movieService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

