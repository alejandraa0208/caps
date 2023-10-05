const handlePickup = require('./handler');
const socket = require('../socket');

// Mock the console.log and socket.emit methods
console.log = jest.fn();
const mockEmit = jest.fn();
socket.emit = mockEmit;

describe('Driver Handler', () => {
  beforeEach(() => {
    mockEmit.mockClear();
    console.log.mockClear();
    jest.useFakeTimers(); 
  });

  afterAll(() => {

    socket.disconnect();
  });

  test('should log a pickup message and emit in-transit and delivered events', () => {
    const payload = { orderId: '12345' };


    handlePickup(payload);

    // Expect console.log to be called with the pickup message
    expect(console.log).toHaveBeenCalledWith('DRIVER: picked up ' + payload.orderId);

    // Expect socket.emit to have been called with in-transit event and payload
    expect(mockEmit).toHaveBeenCalledWith('in-transit', payload);


    jest.advanceTimersByTime(2000);

    // Expect socket.emit to have been called with delivered event and payload
    expect(mockEmit).toHaveBeenCalledWith('delivered', payload);
  });
});


