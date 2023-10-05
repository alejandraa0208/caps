'use strict';

const MessageQueue = require('./queue.js');

describe('Testing the Message Queue class', () => {
  test('Should create a queue for client1', () => {
    let queue = new MessageQueue();

    queue.store('client1', new MessageQueue());
    let messages = queue.read('client1');
    expect(messages.data).toBeTruthy();
    let keys = Object.keys(messages.data);
    expect(keys.length).toEqual(0);
  });

  test('Should be able to store an order in our message queue', () => {
    let queue = new MessageQueue();

    let clientKey = queue.store('client1', new MessageQueue());

    let clientMessages = queue.read(clientKey);
    clientMessages.store('1', {test: 'test string'});
    expect(clientMessages.data['1'].test).toEqual('test string');
  });
});  