const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

const thoughtController = {
	// get all thoughts
	getAllThoughts(req, res) {
			Thought.find({})
					.select('-__v')
					.sort({ _id: -1 })
					.then(dbThoughtData => res.json(dbThoughtData))
					.catch(err => {
							console.log(err);
							res.status(400).json(err);
					});
	}
};

module.exports = {

	getUsers(req, res) {
			User.find()
				.then(async (users) => {
					const UserObj ={
						users,
						thoughts: [],
					};
					return res.json(UserObj);
				})
				.catch((err) => {
					console.log(err);
					res.status(400).json(err);
				});
	},

	getSingleUser(req, res) {
			User.findOne({ _id: req.params.userId })
			.select('-__v')
			.then(async (user) => {
				const UserObj = {
					user,
					thoughts: [],
					};
				!user
					? res.status(404).json({ message: 'No user found with this id!' })
					: res.json(userObj);
				})
				.catch((err) => {
					console.log(err);
					res.status(400).json(err);
				});
	},

	createUser(req, res) {
			User.create(req.body)
				.then((user) => res.json(user))
				.catch((err) => res.status(400).json(err));
	},

	deleteUser(req, res) {
			User.findOneAndDelete({ _id: req.params.userId })
				.then((user) => 
					!user
						? res.status(404).json({ message: 'No user found with this id!' })
						: Thought.findOneAndUpdate(
								{ users: req.params.userId },
								{ $pull: { users: req.params.userId } },
								{ new: true }
						)
				)
				.then((thought) =>
					!thought
							?res.status(404).json({ message: 'No thought found with this id!' })
							: res.json({message: 'student successfully deleted'})
				)
				.catch((err) => {
					console.log(err);
					res.status(400).json(err);
				});
	},


    
};