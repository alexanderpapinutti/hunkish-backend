const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

router.get('/game/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);

        return res.status(200).send({ responseBody: game })
    } catch (e) {

        return res.status(400).send({ error: e })
    }
});


router.get('/games', async (req, res) => {
    try {
        const games = await Game.find({ deleted: false });

        return res.status(200).send({ responseBody: games })
    } catch (e) {

        return res.status(400).send({ error: e })
    }
});

module.exports = router;