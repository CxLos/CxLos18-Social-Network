const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
		updateUser,
		addThought,
    addFriend,
		removeFriend,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router
	.route('/:userId')
	.get(getSingleUser)
	.put(updateUser)
	.delete(deleteUser);

router.route('/:userId/thoughts').post(addThought);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);
// router.route('/:userId/thoughts/:thoughtId').post(addThought).delete(removeThought);

module.exports = router;