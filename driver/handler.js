const io = require('socket.io-client');

// Connect to the Socket.io server running on port 3001
const socket = io.connect('http://localhost:3001/caps');

socket.on('pickup', (payload) => {
  console.log(`DRIVER: picked up ${payload.orderId}`);

  socket.emit('in-transit', payload);
  console.log(`DRIVER: delivered ${payload.orderId}`);

  socket.emit('delivered', payload);
});
