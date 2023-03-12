const { Schema, model } = require('mongoose');
// const userSchema = new Schema(

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Username is required!',
            trim: true,
        },
        email: {
            type: String,
            required: 'Email is required!',
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
        },
        thoughts: [],
        friends: [],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;