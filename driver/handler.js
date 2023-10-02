const eventPool = require('../eventPool');

function handlePickupEvent(payload) {
  console.log(`DRIVER: picked up ${payload.orderId}`);
  eventPool.emit('in-transit', payload);
  console.log(`DRIVER: delivered ${payload.orderId}`);
  eventPool.emit('delivered', payload);
}

module.exports = { handlePickupEvent }; // Export the function

