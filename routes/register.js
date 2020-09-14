const _ = require('lodash');
const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    const password = _.get(req, 'body.password');
    const firstName = _.get(req, 'body.firstName');
    const lastName = _.get(req, 'body.lastName');
    const email = _.get(req, 'body.email');

    try {
        new User({ password, firstName, lastName, email }).save();

        return res.status(200).send({ message: 'User added successfully' });

    } catch (e) {

        return res.status(409).send({ error: e })

    }
});

module.exports = router;