const driverModule = require('./handler');

// Create mock functions for console.log and socket.emit
const mockConsoleLog = jest.spyOn(console, 'log');
const mockSocketEmit = jest.spyOn(driverModule.socket, 'emit');

// Reset the mock functions before each test
beforeEach(() => {
  mockConsoleLog.mockClear();
  mockSocketEmit.mockClear();
});

// Test cases for event handler functions
test('handlePickupEvent should log "picked up" and emit "in-transit" and "delivered" events', () => {
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
  expect(mockSocketEmit).toHaveBeenCalledWith('in-transit', pickupPayload);
  expect(mockConsoleLog).toHaveBeenCalledWith(`DRIVER: delivered ${pickupPayload.orderId}`);
  expect(mockSocketEmit).toHaveBeenCalledWith('delivered', pickupPayload);
});

// You can add more test cases for other event handler functions as needed



