const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    team1: {
        type: Object,
        required: true
    },
    team2: {
        type: Object,
        required: true
    },
    scheduledDate: {
        type: Date
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Game', GameSchema);
