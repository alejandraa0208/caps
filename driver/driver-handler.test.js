const eventPool = require('../eventPool');
const driverModule = require('./handler');

// Create mock functions for console.log and eventPool.emit
const mockConsoleLog = jest.spyOn(console, 'log');
const mockEventPoolEmit = jest.spyOn(eventPool, 'emit');

// Define your test case
test('Driver module handles pickup event correctly', () => {
  // Define a sample payload for testing
  const pickupPayload = {
    store: 'Test Store',
    orderId: 'sample-order-id',
    customer: 'Test Customer',
    address: 'Test Address',
  };

  // Call the handlePickupEvent function from your driver module with the payload
  driverModule.handlePickupEvent(pickupPayload);

  // Check if the driver module logs and emits events correctly
  expect(mockConsoleLog).toHaveBeenCalledWith(`DRIVER: picked up ${pickupPayload.orderId}`);
  expect(mockEventPoolEmit).toHaveBeenCalledWith('in-transit', pickupPayload);
  expect(mockConsoleLog).toHaveBeenCalledWith(`DRIVER: delivered ${pickupPayload.orderId}`);
  expect(mockEventPoolEmit).toHaveBeenCalledWith('delivered', pickupPayload);
});



