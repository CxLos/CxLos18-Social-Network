const { Schema, model } = require('mongoose');
// const Reaction = require('./Reaction');
// const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
    {
        text: {
            type: String,
            required: 'You must enter a thought!',
            length: [1,280]
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: (createdAtVal) => dateFormat(createdAtVal),
        },
        username: {
            type: String,
            required: 'You must enter a username!',
        },
        reactions: [
            {type: Schema.Types.ObjectId,
            ref: "reaction"},
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;