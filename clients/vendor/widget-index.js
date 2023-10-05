'use strict';

const { handleDelivery, createPickup } = require('./widget-handler');
const socket = require('../socket');

const storeName = 'acme-widget'; 

// Join a room with the storeName as the Client ID
socket.emit('join', storeName);


const orderInterval = setInterval(() => {
  const pickupOrder = createPickup(storeName);
  socket.emit('pickup', pickupOrder);
}, 5000); 

// Subscribe to the delivered Queue
socket.emit('getAll', { clientId: storeName, event: 'delivered' });

socket.on('delivered', (payload) => {
  // Handle the 'delivered' event and log a confirmation
  handleDelivery(payload);

  // Trigger the 'received' event with the correct payload to acknowledge receipt
  const receivedPayload = {
    event: 'received',
    messageId: payload.orderId,
    clientId: storeName,
  };
  socket.emit('received', receivedPayload);
});