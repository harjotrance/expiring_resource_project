// controllers/resourceController.js
const Resource = require('../models/Resource');
const { generateToken } = require('../utils/jwt');

exports.createResource = async (req, res) => {
  try {
    const { url, expiration_time } = req.body;
    const userId = req.user.id; // Assuming user is authenticated
    if (!url || !expiration_time) {
      return res.status(400).json({ message: 'URL and expiration time are required' });
    }
    const resource = await Resource.create({
      url,
      expiration_time,
      user_id: userId
    });

    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create resource', error: err.message });
    
  }
};

exports.getResources = async (req, res) => {
  const { status } = req.query;  // Status could be 'active' or 'expired'
  const userId = req.user.id; // Assuming user is authenticated

  try {
    const resources = await Resource.findAll({
      where: { user_id: userId, status: status || 'active' }
    });
    if (resources.length === 0) {
      return res.status(404).json({ message: 'No resources found' });
    }
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch resources', error: err.message });
  }
};

exports.getResource = async (req, res) => {
  const { id } = req.params;

  try {
    const resource = await Resource.findByPk(id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (resource.status === 'expired') {
      return res.status(400).json({ message: 'This resource has expired' });
    }

    res.status(200).json(resource);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve resource', error: err.message });
  }
};

exports.deleteResource = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // Assuming user is authenticated

  try {
    const resource = await Resource.findByPk(id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (resource.user_id !== userId) {
      return res.status(403).json({ message: 'You are not the owner of this resource' });
    }

    await resource.destroy();
    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete resource', error: err.message });
  }
};

exports.generateAuthToken = async (req, res) => {

  try {
    // Generate a token for the user (valid for 1 hour)
    const token = await generateToken(req.body.name, req.body.email );

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error creating resource', error });
  }
};
