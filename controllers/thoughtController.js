const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {

	getThoughts(req, res) {
		Thought.find()
			.then(async (thoughts) => {
				const thoughtObj = {
					thoughts,
					users: [],
				};
				return res.json(thoughtObj);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	getSingleThought(req, res) {
		Thought.findOne({ _id: req.params.thoughtId })
			.select('-__v')
			.then(async (thought) => {
				const thoughtObj = {
					thought,
					user: [],
				};
				!thought
					? res.status(404).json({ message: 'No thought found with this id!' })
					: res.json(thoughtObj);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	createThought(req, res) {
		Thought.create(req.body)
		.then((thought) => res.json(thought))
		.catch((err) => res.status(400).json(err));
	},

	updateThought(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId }, 
			{ $set: req.body },
			{ runValidators: true, new: true}
		)
			.then((thought) =>
				!thought
					? res.status(404).json({ message: 'No thought found with this id!' })
					: res.json(thought)
			)
			.catch((err) => res.status(400).json(err));
	},

	deleteThought(req, res) {
		Thought.findOneAndDelete({ _id: req.params.thoughtId })
			.then((thought) => 
				!thought
					? res.status(404).json({ message: 'No thought found with this id!' })
					: Thought.deleteMany({ _id: { $in: thought.reactions } })
			)
			.then(() => res.json({ message: 'Thought deleted!' }))
			.catch((err) => res.status(400).json(err));
			},
};