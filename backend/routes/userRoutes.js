const express = require('express');
const { loginUser, registerUser, updateProfile, updateAddress, DisplayUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', authMiddleware, updateProfile);
router.put('/address', authMiddleware, updateAddress);
router.get('/', authMiddleware, DisplayUser);

module.exports = router;