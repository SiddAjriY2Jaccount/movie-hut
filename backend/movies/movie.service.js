const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Movie = db.Movie;

module.exports = {
    //authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

/* 
async function authenticate({ email, password }) {
    const movie = await Movie.findOne({ email });
    if (movie && bcrypt.compareSync(password, movie.password)) {
        const token = jwt.sign({ sub: movie.id }, config.secret, { expiresIn: '7d' });
        return {
            ...movie.toJSON(),
            token
        };
    }
}
 */

async function getAll() {
    return await Movie.find();
}

async function getById(id) {
    return await Movie.findById(id);
}

async function create(movieParam) {
    // validate
    if (await Movie.findOne({ email: movieParam.email })) {
        throw 'Email "' + movieParam.email + '" is already taken';
    }

    const movie = new Movie(movieParam);

    // hash password
    if (movieParam.password) {
        movie.password = bcrypt.hashSync(movieParam.password, 10);
    }

    // save movie
    await movie.save();
}

async function update(id, movieParam) {
    const movie = await Movie.findById(id);

    // validate
    if (!movie) throw 'movie not found';
    if (movie.email !== movieParam.email && await Movie.findOne({ email: movieParam.email })) {
        throw 'Email "' + movieParam.email + '" is already taken';
    }

    // hash password if it was entered
    if (movieParam.password) {
        movieParam.password = bcrypt.hashSync(movieParam.password, 10);
    }

    // copy movieParam properties to movie
    Object.assign(movie, movieParam);

    await movie.save();
}

async function _delete(id) {
    await Movie.findByIdAndRemove(id);
}