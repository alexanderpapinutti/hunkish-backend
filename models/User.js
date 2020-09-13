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
        required: true
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

        bcrypt.hash(this.password, 10, (err, hashedPassword) => {
            if (err) {
                next(err);
            } else {
                this.password = hashedPassword;
                next();
            }
        });
    } else {
        next();
    }
});

UserSchema.methods.validatePassword = function (data) {
    return bcrypt.compare(data, this.password)
}

module.exports = mongoose.model('User', UserSchema);
