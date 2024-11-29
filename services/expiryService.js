const cron = require('node-cron');
const { Op } = require('sequelize');
const Resource = require('../models/Resource'); // Adjust the path to your models
const moment = require('moment');  // To easily handle dates

// Set up the cron job to run every minute
cron.schedule('* * * * *', async () => {
  try {
    // Find resources where expiration_time is in the past and mark them as expired
    await Resource.update(
      { status: 'expired' }, // Assuming you have a 'status' column to store 'active' or 'expired'
      { where: { expiration_time: { [Op.lt]: moment().toDate() }, status: 'active' } } // SELECT * FROM Resources WHERE expiration_time < NOW();
    );
    console.log('Expired resources have been updated.');
  } catch (error) {
    console.error('Error in cron job:', error);
  }
});
