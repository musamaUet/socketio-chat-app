const router = require('express').Router();
const {
	accessChat,
	fetchChat,
	createGroupChat,
} = require('../controllers/chatController');
const { auth } = require('../middlewares/authMiddleware');

router.route('/').post(auth, accessChat);
router.route('/').get(auth, fetchChat);
router.route('/group').post(auth, createGroupChat);
// router.route('/rename').post(auth, createGroupChat);
// router.route('/groupRemove').post(auth, renameFromGroup);
// router.route('/groupAdd').post(auth, addToGroup);

module.exports = router;
