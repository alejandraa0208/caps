const eventPool = require('./eventPool');
const hub = require('./hub'); // Import the hub module
const Chance = require('chance');
const chance = new Chance();

let consoleOutput = [];

// Mock eventPool.emit
eventPool.emit = jest.fn();

describe('Event Handlers in hub.js', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mock calls after each test
    consoleOutput = []; // Clear the captured console output
  });

  test('pickup event handler logs and emits correctly', () => {
    const payload = {
      store: 'Test Store',
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  
    // Call the pickupEventHandler from your hub module with the payload
    hub.pickupEventHandler(payload);
  
    // Check if console.log was called with the expected message
    expect(consoleOutput.some((message) =>
      message.includes(`Received a pickup event: ${JSON.stringify(payload)}`),
    )).toBe(true);
  
    // Check if eventPool.emit was called with the 'pickup' event and the payload
    expect(eventPool.emit).toHaveBeenCalledWith('pickup', payload);
  });
});
