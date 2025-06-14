const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const express = require('express');
const router = express.Router();

/**
 * User Controller
 * Handles user registration, login, addition, retrieval, updating, and deletion.
 */

// Register User
const registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, phone, password: hashedPassword });
    await user.save();

    // Generate token
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (error) {
    console.error('Error registering user:', error); // Log error for debugging
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    console.log('User found:', user); // Debug log to check the user object

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the input password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch); // This will show if passwords match

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error); // Log error for debugging
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Add User
const addUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, phone, password: hashedPassword });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error); // Log error for debugging
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: 1 });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error); // Log error for debugging
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error); // Log error for debugging
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Update User
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { name, email, phone }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error); // Log error for debugging
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error); // Log error for debugging
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

module.exports = {
  addUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
};
