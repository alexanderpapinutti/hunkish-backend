const _ = require('lodash');
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    const password = _.get(req, 'body.password');
    const firstName = _.get(req, 'body.firstName');
    const lastName = _.get(req, 'body.lastName');
    const email = _.get(req, 'body.email');

    try {
        await new User({ password, firstName, lastName, email, approved: false }).save();

        return res.status(200).send({ message: 'User registered successfully' });

    } catch (e) {

        return res.status(409).send({ error: e })

    }
});

module.exports = router;