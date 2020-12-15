const express = require('express');
const router = express.Router();
const hallService = require('./hall.service');

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
    hallService.authenticate(req.body)
        .then(hall => hall ? res.json(hall) : res.status(400).json({ message: 'Email or password is incorrect' }))
        .catch(err => next(err));
}
 */

function register(req, res, next) {
    hallService.create(req.body)
        .then(() => res.json({success: 'true'}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    hallService.getAll()
        .then(halls => res.json(halls))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    hallService.getById(req.hall.sub)
        .then(hall => hall ? res.json(hall) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    hallService.getById(req.params.id)
        .then(hall => hall ? res.json(hall) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    hallService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    hallService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

