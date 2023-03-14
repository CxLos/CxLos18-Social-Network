const { Schema, model } = require('mongoose');
// const thoughtSchema = require('./Thought')
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
        thoughts: [
            {type: Schema.Types.ObjectId,
            ref: "Thought"},
        ],
        friends: [
            {type: Schema.Types.ObjectId, 
            ref: "user"},
        ],
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

const User = model('user', userSchema);

module.exports = User;