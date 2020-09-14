const User = require('../models/User');
const express = require('express');
const router = express.Router();

//will use later
//const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Incorrect email' });
        }
        let validation = await user.validatePassword(password);

        if (validation) {
            return res.status(200).send({ responseBody: user })
        }

        return res.status(401).send({ error: 'Password validation failed' })

    } catch (e) {
        return res.status(500).send({ error: e })
    }
});

module.exports = router;