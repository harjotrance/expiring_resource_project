const cron = require('node-cron');
const Resource = require('../models/Resource');

cron.schedule('* * * * *', async () => {
  try {
    const expiredResources = await Resource.findAll({
      where: {
        expiration_time: { [Sequelize.Op.lt]: new Date() },
        status: 'active'
      }
    });

    expiredResources.forEach(async (resource) => {
      await resource.update({ status: 'expired' });
    });

    console.log('Expired resources updated');
  } catch (err) {
    console.error('Error during expiration check:', err.message);
  }
});
