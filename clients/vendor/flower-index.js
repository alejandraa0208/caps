'use strict';

const { handleDelivery, createPickup } = require('./flower-handler');
const socket = require('../socket');

const storeName = '1-800-flowers';

socket.emit('join', storeName);

const orderInterval = setInterval(() => {
  const pickupOrder = createPickup(storeName);
  socket.emit('pickup', pickupOrder);
}, 5000); 

socket.emit('getAll', { clientId: storeName, event: 'delivered' });

socket.on('delivered', (payload) => {
 
  handleDelivery(payload);

  const receivedPayload = {
    event: 'received',
    messageId: payload.orderId,
    clientId: storeName,
  };
  socket.emit('received', receivedPayload);
});