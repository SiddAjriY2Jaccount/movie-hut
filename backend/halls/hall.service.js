const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Hall = db.Hall;

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
    const hall = await hall.findOne({ email });
    if (hall && bcrypt.compareSync(password, hall.password)) {
        const token = jwt.sign({ sub: hall.id }, config.secret, { expiresIn: '7d' });
        return {
            ...hall.toJSON(),
            token
        };
    }
}
 */

async function getAll() {
    return await Hall.find();
}

async function getById(id) {
    return await Hall.findById(id);
}

async function create(hallParam) {
    // validate
    if (await Hall.findOne({ email: hallParam.email })) {
        throw 'Email "' + hallParam.email + '" is already taken';
    }

    const hall = new Hall(hallParam);

    // hash password
    if (hallParam.password) {
        hall.password = bcrypt.hashSync(hallParam.password, 10);
    }

    // save hall
    await hall.save();
}

async function update(id, hallParam) {
    const hall = await Hall.findById(id);

    // validate
    if (!hall) throw 'hall not found';
    if (hall.email !== hallParam.email && await Hall.findOne({ email: hallParam.email })) {
        throw 'Email "' + hallParam.email + '" is already taken';
    }

    // hash password if it was entered
    if (hallParam.password) {
        hallParam.password = bcrypt.hashSync(hallParam.password, 10);
    }

    // copy hallParam properties to hall
    Object.assign(hall, hallParam);

    await hall.save();
}

async function _delete(id) {
    await Hall.findByIdAndRemove(id);
}