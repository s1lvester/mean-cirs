
const config = require('config');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
    let token = signToken(req.body.email);
    res.json({
        token: token
    });
});

router.post('/login', (req, res) => {
    // ----------------------------------------------
    // FIXME: Delete after testing.
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        console.log(hash);
    });
    // ----------------------------------------------

    if (req.body.email === undefined
        || req.body.password === undefined
        || req.body.email === ''
        || req.body.password === ''
    ) {
        res.sendStatus(400);
        return;
    } else {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                res.sendStatus(500); // Error Database call
                return;
            } else if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result) {
                        let token = signToken(req.body.email);
                        res.json({
                            token: token
                        });
                        return;
                    } else {
                        res.sendStatus(401); // Wrong Password
                        return;
                    }
                });
            } else {
                res.sendStatus(401); // No such Username
                return;
            }
        });
    }

});

function signToken(email) {
    return jwt.sign({ email: email }, config.SECRET_KEY, {
        expiresIn: 3600
    });
}

module.exports = router;
