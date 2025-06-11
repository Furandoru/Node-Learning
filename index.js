const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/userRoutes');
const propertyRoutes = require('./Routes/propertyRoutes');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/realestate', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB successfully');
  app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);