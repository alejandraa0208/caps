const eventPool = require('../eventPool');
const driverHandler = require('./handler');

eventPool.on('pickup', driverHandler.handlePickupEvent);

console.log('Drive module is running...');