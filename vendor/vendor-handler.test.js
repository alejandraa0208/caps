const eventPool = require('../eventPool');
const vendorHandler = require('./handler');
const Chance = require('chance');
const chance = new Chance();

test('simulatePickupEvent', () => {
  // Generate a random payload using Chance library
  const generatedPayload = {
    store: 'Vendor-Store-1',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };

  // Mock eventPool.emit to capture the emitted event
  eventPool.emit = jest.fn();

  // Call the vendor handler function
  vendorHandler.simulatePickupEvent('Vendor-Store-1');

  // Check if eventPool.emit was called with the 'pickup' event and the expected payload
  expect(eventPool.emit).toHaveBeenCalledWith('pickup', generatedPayload);
});


