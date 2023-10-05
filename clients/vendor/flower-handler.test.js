const handler = require('./flower-handler'); // Import the correct module name
const Chance = require('chance');

// Mock the console.log method to spy on it
console.log = jest.fn();

describe('Flower Handler', () => {
  afterEach(() => {
    // Clear the mock calls after each test
    console.log.mockClear();
  });

  describe('handleDelivery', () => {
    it('should log a thank you message', () => {
      const payload = {
        orderId: '12345',
      };

      // Call the handleDelivery function
      handler.handleDelivery(payload); // Use the correct module name

      // Expect console.log to have been called with the expected message
      expect(console.log).toHaveBeenCalledWith('Thank you for delivering ' + payload.orderId);
    });
  });

  describe('createPickup', () => {
    it('should create a pickup order with the correct structure', () => {
      const storeName = '1-800-flower';

      // Call the createPickup function
      const pickupOrder = handler.createPickup(storeName); // Use the correct module name

      // Expect the pickupOrder to have the correct structure
      expect(pickupOrder).toEqual(
        expect.objectContaining({
          store: storeName,
          orderId: expect.any(String),
          customer: expect.any(String),
          address: expect.any(String),
        }),
      );
    });
  });
});






