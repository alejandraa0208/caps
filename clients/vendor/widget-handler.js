'use strict';

const Chance = require('chance');
const chance = new Chance();

function handleDelivery(payload) {
  console.log('Thank you for delivering ' + payload.orderId);
}
 
function createPickup(storeName) {
  return {
    store: storeName,
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
}

module.exports = {
  handleDelivery,
  createPickup,
};