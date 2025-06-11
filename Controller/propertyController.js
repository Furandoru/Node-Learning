const Property = require('../models/Property');
const User = require('../models/User');

const addProperty = async (req, res) => {
  const { title, price, bedrooms, sqm, location, userId } = req.body;
  if (!title || !price || !bedrooms || !sqm || !location || !userId) {
    return res.status(400).json({ message: 'All fields including userId are required' });
  }
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const property = new Property({ title, price, bedrooms, sqm, location, userId });
  try {
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error creating property', error });
  }
};

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error });
  }
};

const getPropertyById = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findById(id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property', error });
  }
};

const updateProperty = async (req, res) => {
  const { id } = req.params;
  const { title, price, bedrooms, sqm, location, userId } = req.body;
  if (!userId) return res.status(400).json({ message: 'User ID (userId) is required for update' });
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  try {
    const property = await Property.findOneAndUpdate(
      { _id: id, userId },
      { title, price, bedrooms, sqm, location },
      { new: true }
    );
    if (!property) return res.status(404).json({ message: 'Property not found or unauthorized' });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error updating property', error });
  }
};

const deleteProperty = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: 'User ID (userId) is required for deletion' });
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  try {
    const property = await Property.findOneAndDelete({ _id: id, userId });
    if (!property) return res.status(404).json({ message: 'Property not found or unauthorized' });
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property', error });
  }
};

module.exports = { addProperty, getProperties, getPropertyById, updateProperty, deleteProperty };