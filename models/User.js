const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

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
    // Check if document is new or a new password has been set
    if (this.isNew || this.isModified('password')) {
        // Saving reference to this because of changing scopes
        const document = this;
        console.log(document.password);
        bcrypt.hash(document.password, saltRounds,
            function (err, hashedPassword) {
                if (err) {
                    next(err);
                }
                else {
                    document.password = hashedPassword;
                    next();
                }
            });
    } else {
        next();
    }
});

UserSchema.methods.isCorrectPassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    });
}

// UserSchema.methods.isCorrectPassword = (password, callback) => {
//     const document = this;
//     console.log(document.password, password)

//     bcrypt.compare(password, document.password, (err, same) => {
//         if (err) {
//             return callback(err);
//         }
//         console.log(1)
//         return callback(same);
//     });
// }
module.exports = mongoose.model('User', UserSchema);
