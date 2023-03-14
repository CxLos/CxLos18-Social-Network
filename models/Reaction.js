const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        body: {
            type: String,
            required: 'You must enter a reaction!',
            length: [1,280]
        },
        username: {
            type: String,
            required: 'You must enter a username!',
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: (createdAtVal) => dateFormat(createdAtVal),
        },
    });

    const Reaction = model('reaction', reactionSchema);

    // module.exports = reactionSchema;
    module.exports = Reaction;