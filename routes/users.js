const express = require('express');
const router = express.Router();

let usersRoute = router;

usersRoute.get('/user/:id', (req, res) => res.send('Get user'));

usersRoute.get('/users', (req, res) => res.send('Get users'));

module.exports = usersRoute;