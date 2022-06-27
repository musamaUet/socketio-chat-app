const router = require('express').Router();
const { auth } = require('../middlewares/authMiddleware');
const {
	registerUser,
	authUser,
	allUsers,
} = require('../controllers/userController');

router.route('/').post(registerUser).get(auth, allUsers);
router.route('/login').post(authUser);

module.exports = router;
