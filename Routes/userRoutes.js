const express = require('express');
const router = express.Router();

const { getUsers, getUserById, updateUser, deleteUser, registerUser, loginUser } = require('../Controller/UserController');
const { protect } = require('../middleware/authMiddleware');
// Optional: protected route example
router.get('/profile', protect, (req, res) => {
  res.json({ message: 'This is protected data', userId: req.user });
});

// Admin or utility routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
