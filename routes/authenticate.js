const User = require('../models/User');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';


router.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal error please try again' });
        } else if (!user) {
            return res.status(401).json({ error: 'Incorrect email or password' });
        } else {
            user.isCorrectPassword(password, (err, same) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal error please try again' });
                } else if (!same) {
                    return res.status(401).json({ error: 'Incorrect email or password' });
                } else {
                    // Issue token
                    const payload = { email };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });

                    return res.cookie('token', token, { httpOnly: true }).sendStatus(200);
                }
            });
        }
    });
});

module.exports = router;