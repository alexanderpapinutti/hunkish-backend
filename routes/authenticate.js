const User = require('../models/User');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    return User.findOne({ email }, async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Internal error please try again' });
        } else if (!user) {
            return res.status(401).json({ error: 'Incorrect email' });
        } else {
            let validation = await user.validatePassword(password);

            if (validation) {
                return res.status(200).send({ responseBody: user })
            }

            return res.status(401).send({ error: 'Password validation failed' })
        }
    });
});

module.exports = router;