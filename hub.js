const http = require('http'); // Import the HTTP module
const io = require('socket.io'); // Import Socket.io
const server = http.createServer(); // Create an HTTP server

// Create a Socket.io server and attach it to the HTTP server
const socketIoServer = io(server, {
  cors: {
    origin: '*',
  },
});

const capsNamespace = socketIoServer.of('/caps');

const vendorRooms = new Map();

capsNamespace.on('connection', (socket) => {
  socket.on('pickup', (payload) => {
    socket.broadcast.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    const vendorRoom = vendorRooms.get(payload.store);
    if (vendorRoom) {
      socket.to(vendorRoom).emit('in-transit', payload);
    }
  });

  socket.on('delivered', (payload) => {
    const vendorRoom = vendorRooms.get(payload.store);
    if (vendorRoom) {
      socket.to(vendorRoom).emit('delivered', payload);
    }
  });

  socket.on('join', (storeName) => {
    socket.join(storeName);
    vendorRooms.set(storeName, storeName);
  });
});

// Start the HTTP server on port 3001
server.listen(3001, () => {
  console.log('Socket.io server is running on port 3001');
});

// Export the event handlers
module.exports = {
  pickupEventHandler: (payload) => {
    // Your pickup event handling logic here
  },
  inTransitEventHandler: (payload) => {
    // Your in-transit event handling logic here
  },
  deliveredEventHandler: (payload) => {
    // Your delivered event handling logic here
  },
};

