const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

UserSchema.pre('save', function (next) {

    if (this.isNew || this.isModified('password')) {

        bcrypt.hash(this.password, 10, (err, hash) => {
            if (err) {
                next(err);
            } else {
                this.password = hash;
                next();
            }
        });
    } else {
        next();
    }
});

UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', UserSchema);
