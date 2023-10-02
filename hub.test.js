const hub = require('./hub');
const eventPool = require('./eventPool');
const Chance = require('chance');
const chance = new Chance();

// Create a mock console.log function to capture log output
let consoleOutput = [];
console.log = (message) => {
  consoleOutput.push(message);
};

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

    hub.pickupEventHandler(payload);

    // Check if console.log was called with the expected message
    expect(consoleOutput.some((message) => message.includes('Received a pickup event:'))).toBe(true);

    // Check if eventPool.emit was called with the 'pickup' event and the payload
    expect(eventPool.emit).toHaveBeenCalledWith('pickup', payload);
  });

  test('in-transit event handler logs and emits correctly', () => {
    const payload = {
      store: 'Test Store',
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };

    hub.inTransitEventHandler(payload);

    // Check if console.log was called with the expected message
    expect(consoleOutput.some((message) => message.includes('Received an in-transit event:'))).toBe(true);

    // Check if eventPool.emit was called with the 'in-transit' event and the payload
    expect(eventPool.emit).toHaveBeenCalledWith('in-transit', payload);
  });

  test('delivered event handler logs and emits correctly', () => {
    const payload = {
      store: 'Test Store',
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };

    hub.deliveredEventHandler(payload);

    // Check if console.log was called with the expected message
    expect(consoleOutput.some((message) => message.includes('Received a delivered event:'))).toBe(true);

    // Check if eventPool.emit was called with the 'delivered' event and the payload
    expect(eventPool.emit).toHaveBeenCalledWith('delivered', payload);
  });
});

