'use strict';

const handlePickup = require('./handler');
const socket = require('../socket');

const driverName = 'driver';


socket.emit('join', driverName);

socket.emit('subscribe', ['acme-widgets', '1-800-flowers']);

socket.emit('getAll', { clientId: driverName, event: 'pickup' });

socket.on('pickup', (payload) => {

  handlePickup(payload);

  const receivedPayload = {
    event: 'received',
    messageId: payload.orderId,
    clientId: driverName,
  };
  socket.emit('received', receivedPayload);
});
