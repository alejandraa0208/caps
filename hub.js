// hub.js

const eventPool = require('./eventPool');
const Chance = require('chance');
const chance = new Chance();

// Event handler functions
const pickupEventHandler = (payload) => {
  console.log(`Received a pickup event:`, payload);
  eventPool.emit('pickup', payload);
};

const inTransitEventHandler = (payload) => {
  console.log(`Received an in-transit event:`, payload);
  eventPool.emit('in-transit', payload);
};

const deliveredEventHandler = (payload) => {
  console.log(`Received a delivered event:`, payload);
  eventPool.emit('delivered', payload);
};

// Notification to Stakeholders
eventPool.on('delivered', (payload) => {
  const vendorName = chance.company();
  console.log(`Notifying ${vendorName} that the package has been delivered.`);
});

// Error Handling
eventPool.on('error', (error) => {
  console.error(`An error occurred:`, error);
  const adminEmail = chance.email();
  console.log(`Sending alert to ${adminEmail}: An error occurred in the CAPS system: ${error.message}`);
});

module.exports = {
  pickupEventHandler,
  inTransitEventHandler,
  deliveredEventHandler,
};
