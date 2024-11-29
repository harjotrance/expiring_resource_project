const jwt = require('jsonwebtoken');
const Users = require('../models/User');  // Import User model

// Generate JWT after matching email and name in the database
const generateToken = async (name, email) => {
  try {
    // Find the user in the database
    const foundUser = await Users.findOne({ where: { name, email } });
    console.log(" userss "+JSON.stringify(foundUser));
    
    if (!foundUser) {
      throw new Error('User not found');
    }

    // Token payload includes verified data
    const payload = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    };

    // Sign the token with your secret and set expiration (e.g., 1 hour)
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  } catch (error) {
    console.error('Error generating token:', error);
    throw error;
  }
};

module.exports = { generateToken };
