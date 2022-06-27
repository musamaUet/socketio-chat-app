const router = require('express').Router();
const {
	accessChat,
	fetchChat,
	createGroupChat,
	renameGroup,
	addToGroup,
	removeFromGroup,
} = require('../controllers/chatController');
const { auth } = require('../middlewares/authMiddleware');

router.route('/').post(auth, accessChat);
router.route('/').get(auth, fetchChat);
router.route('/group').post(auth, createGroupChat);
router.route('/rename').put(auth, renameGroup);
router.route('/groupAdd').put(auth, addToGroup);
router.route('/groupRemove').put(auth, removeFromGroup);

module.exports = router;
