# CAPS (Common Alerting and Public Safety) System

CAPS Phase 1:

Begin the build of an application for a product called CAPS - The Code Academy Parcel Service. In this sprint, we’ll build out a system that emulates a real world supply chain. CAPS will simulate a delivery service where vendors (such a flower shops) will ship products using our delivery service and when our drivers deliver them, each vendor will be notified that their customers received what they purchased.

This will be an event driven application that “distributes” the responsibility for logging to separate modules, using only events to trigger logging based on activity.

## Installation

npm install

npm start

## Usage

### Vendor Application

Open the vendor.js file in your preferred code editor.

Inside vendor.js, use the queue.connect() method to establish a connection to the CAPS Hub Server.

Subscribe to specific events (e.g., 'delivered') using the queue.subscribe(event, callback) method. Provide a callback function to handle received data.

queue.connect();

queue.subscribe('delivered', (payload) => {

  // Handle the received data (payload)

});

Run the vendor application:

node vendor.js

## UML

![UML](./assets/Screenshot%202023-10-02%20at%203.42.28%20PM.png)

## Deployed URL

## Collaborators

Jacob Knaack, Chat GPT