const connection = require('../config/connection');
const { User, Thought } = require('../models');
// const { } =  require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('We are now connected!');
    
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = [];
    const thoughts = [];

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.info('Done! 🌱');
    process.exit(0);
})