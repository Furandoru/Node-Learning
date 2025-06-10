const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/testdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));    

// User model
const User = require('./models/User');

// Routes
app.get('/users', async (req, res) => {
    try {
        const { email, name } = req.query;
        const filter = {};
        if (email) filter.email = email;
        if (name) filter.name = { $regex: name, $options: 'i' };

        const users = await User.find(filter);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

app.post('/users', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser);
});

app.put('/users/:id', async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedUser);
});

app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
// Export the app for testing purposes
module.exports = app;