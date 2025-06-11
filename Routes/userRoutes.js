const express = require('express');
const { addUser, getUsers, getUserById, updateUser, deleteUser } = require('../Controller/UserController');
const router = express.Router();

router.post('/add', addUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;