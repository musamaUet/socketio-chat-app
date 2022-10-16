const router = require('express').Router();
const {
	sendMessage,
	allMessages,
} = require('../controllers/messageController');
const { auth } = require('../middlewares/authMiddleware');

router.route('/').post(auth, sendMessage);
router.route('/:chatId').get(auth, allMessages);

module.exports = router;
