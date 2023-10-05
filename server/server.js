const { Server } = require('socket.io');
const MessageQueue = require('./lib/queue');
require('dotenv').config();
const PORT = process.env.PORT || 3001;

const server = new Server(PORT);

const capsServer = server.of('/caps');

// Queues for driver and vendor clients
const driverQueue = new MessageQueue();
const vendorQueue = new MessageQueue();

// Stores undelivered messages for each client
const undeliveredMessages = new Map();

function logger(type, payload) {
  const event = {
    event: type,
    time: new Date(),
    payload,
  };
  console.log(`EVENT`, event);
}

capsServer.on('connection', (socket) => {
  console.log(`Client connected to 'caps' namespace`);

  socket.on('join', (clientId) => {
    socket.join(clientId);
    console.log(`Client joined room: ${clientId}`);
  });

  socket.on('pickup', (payload) => {
    logger('pickup', payload);

    // Add payload to the driver queue
    driverQueue.store(payload.orderId, payload);

    // Broadcast 'pickup' event to all clients in the same room (Driver)
    capsServer.to(payload.store).emit('pickup', payload);

    // Emit 'pickup' event to all other clients except the sender (Global Event Pool)
    socket.broadcast.emit('pickup', payload);

    // Add payload to the received queue
    const receivedPayload = {
      event: 'pickup',
      messageId: payload.orderId,
      clientId: payload.store,
      order: payload,
    };
    vendorQueue.store(payload.orderId, receivedPayload);

    // Track undelivered message
    undeliveredMessages.set(payload.store, undeliveredMessages.get(payload.store) || []);
    undeliveredMessages.get(payload.store).push(receivedPayload);
  });

  socket.on('in-transit', (payload) => {
    logger('in-transit', payload);

    // Emit 'in-transit' event only to Vendors in the same room
    capsServer.to(payload.store).emit('in-transit', payload);

    // Add payload to the received queue
    const receivedPayload = {
      event: 'in-transit',
      messageId: payload.orderId,
      clientId: payload.store,
      order: payload,
    };
    driverQueue.store(payload.orderId, receivedPayload);

    // Track undelivered message
    undeliveredMessages.set(payload.store, undeliveredMessages.get(payload.store) || []);
    undeliveredMessages.get(payload.store).push(receivedPayload);
  });

  socket.on('delivered', (payload) => {
    logger('delivered', payload);

    // Emit 'delivered' event only to Vendors in the same room
    capsServer.to(payload.store).emit('delivered', payload);

    // Add payload to the vendor queue
    vendorQueue.store(payload.orderId, payload);

    // Add payload to the received queue
    const receivedPayload = {
      event: 'delivered',
      messageId: payload.orderId,
      clientId: payload.store,
      order: payload,
    };
    driverQueue.store(payload.orderId, receivedPayload);

    // Remove the message from the undelivered messages list
    undeliveredMessages.set(payload.store, undeliveredMessages.get(payload.store) || []);
    undeliveredMessages.set(
      payload.store,
      undeliveredMessages.get(payload.store).filter((msg) => msg.messageId !== payload.orderId),
    );
  });

  // Handle 'received' event to acknowledge that a payload was successfully read
  socket.on('received', (payload) => {
    // Remove the payload from the appropriate queue based on event and client ID
    if (payload.event === 'pickup') {
      driverQueue.remove(payload.messageId);
    } else if (payload.event === 'delivered') {
      vendorQueue.remove(payload.messageId);
    }

    // Remove the message from the undelivered messages list
    if (undeliveredMessages.has(payload.clientId)) {
      undeliveredMessages.set(
        payload.clientId,
        undeliveredMessages.get(payload.clientId).filter((msg) => msg.messageId !== payload.messageId),
      );
    }
  });

  // Handle 'getAll' event to retrieve and broadcast queued payloads for a specific client and event
  socket.on('getAll', (payload) => {
    // Retrieve and broadcast queued payloads for the specified client and event
    const queue = payload.clientId === 'driver' ? driverQueue : vendorQueue;
    const eventQueue = Object.values(queue.data).filter(
      (item) => item.clientId === payload.clientId && item.event === payload.event,
    );
    eventQueue.forEach((item) => {
      socket.emit(item.event, item.order);
    });

    // Check for undelivered messages and re-send them
    const undelivered = undeliveredMessages.get(payload.clientId) || [];
    undelivered.forEach((undeliveredPayload) => {
      socket.emit(undeliveredPayload.event, undeliveredPayload.order);
    });

    socket.on('disconnect', () => {
      console.log(`${socket.id} disconnected from 'caps' namespace`);
      
      // Log undelivered messages when a client disconnects
      if (undeliveredMessages.has(payload.clientId)) {
        const undelivered = undeliveredMessages.get(payload.clientId);
        undelivered.forEach((message) => {
          console.log(`Undelivered message on disconnect: ${message.messageId}`);
        });
        
        // Clear the undelivered messages for this client
        undeliveredMessages.delete(payload.clientId);
      }
    });
  });
});