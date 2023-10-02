const eventPool = require('../eventPool');
const vendorHandler = require('./handler');

console.log('Vendor module is running...');

// Example: Simulate a pickup event for a vendor
vendorHandler.simulatePickupEvent('1-206-flowers');
