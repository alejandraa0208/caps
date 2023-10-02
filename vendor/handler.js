const eventPool = require('../eventPool');
const Chance = require('chance');
const chance = new Chance();

function simulatePickupEvent(storeName) {
  const orderPayload = {
    store: storeName,
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };

  eventPool.emit('pickup', orderPayload);
}

eventPool.on('delivered', (payload) => {
  console.log(`VENDOR: Thank you for your order ${payload.customer}`);
});

module.exports = { simulatePickupEvent };
