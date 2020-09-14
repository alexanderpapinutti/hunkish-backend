const User = require('../models/User');
const express = require('express');
const router = express.Router();

let usersRoute = router;

usersRoute.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        return res.status(200).send({ responseBody: user })
    } catch (e) {

        return res.status(400).send({ error: e })
    }
});


usersRoute.get('/users', (req, res) => {
    try {
        const users = await User.find({ deleted: false });

        return res.status(200).send({ responseBody: users })
    } catch (e) {

        return res.status(400).send({ error: e })
    }
});

module.exports = usersRoute;