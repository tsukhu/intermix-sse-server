const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const events = require('./generateNextEvent.js');

const app = express();

// Middleware for GET /events endpoint
function eventsHandler(req, res, next) {
  console.log('Events handler called');
  // Mandatory headers and http status to keep connection open
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  };
  res.writeHead(200, headers);

  // After client opens connection send all dispatches as string
  //const data = `data: ${JSON.stringify(dispatches)}\n\n`;
  //res.write(data);

  // Generate an id based on timestamp and save res
  // object of client connection on clients list
  // Later we'll iterate it and send updates to each client
  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res,
  };
  clients.push(newClient);

  // When client closes connection we update the clients list
  // avoiding the disconnected one
  req.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((c) => c.id !== clientId);
    if (clients.length === 0) {
      res.end();
    }
  });

  setInterval(() => {
    if (clients.length > 0) {
      const event = events.generateNextEvent();
      sendEventsToAll(event);
    }
  }, 20000);
}

// Iterate clients list and use write res object method to send new tms
function sendEventsToAll(event) {
  clients.forEach((c) => c.res.write(`data: ${JSON.stringify(event)}\n\n`));
}

// Set cors and bodyParser middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define endpoints
app.get('/events', eventsHandler);
app.get('/status', (req, res) => res.json({ clients: clients.length }));

const port = process.env.PORT || 3001;

let clients = [];

// Start server on 3000 port
app.listen(port, () =>
  console.log(`SSE Events service listening on port ${port}`)
);
