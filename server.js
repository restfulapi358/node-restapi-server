const express = require('express');
const config = require('./config');
const validateApiToken = require('./apiTokenFilter');

/** import routes */
const booksRoute = require('./booksRoute'); // Import book routes

/**process input parameters */
const args = process.argv.slice(2); // Skip 'node' and script name
args.forEach((arg, index) => {
  if (arg === '--key' && args[index + 1]) {
    config.KEY = args[index + 1];
  }
  if (arg === '--workerId' && args[index + 1]) {
    config.workder.WORKER_ID= args[index + 1];
  }
  if (arg === '--workerHost' && args[index + 1]) {
    config.workder.WORKER_HOST = args[index + 1];
  }
  if (arg === '--workerUrl' && args[index + 1]) {
    config.WORKER_URL = args[index + 1];
  }
  if (arg === '--workerName' && args[index + 1]) {
    config.workder.WORKER_NAME = args[index + 1];
  }
  if (arg === '--workerVersion' && args[index + 1]) {
    config.workder.WORKER_VERSION = args[index + 1];
  }
  if (arg === '--workerRoute' && args[index + 1]) {
    config.workder.WORKER_ROUTE = args[index + 1];
  }
  if (arg === '--workerRouteVersion' && args[index + 1]) {
    config.workder.WORKER_ROUTE_VERSION = args[index + 1];
  }
 
});

const app = express();
const port = 0;

// Middleware to parse JSON requests
app.use(express.json());

// Apply token check globally
app.use(validateApiToken);

/** add routes */
app.use('/v1/api', booksRoute);

// /hello route
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// Heartbeat function
function sendHeartbeat() {
  console.log("beat heart ..." );
  axios.post(config.WORKER_URL, config, {
    headers: {
      'x-api-token': config.KEY,
      'Content-Type': 'application/json',
    },
  })
  .then(res => console.log('Heartbeat sent:', res.data))
  .catch(err => console.error('Heartbeat failed:', err.message));
}

// Schedule heartbeat every 10 seconds
if(config.workder.WORKER_ID!=='localhost'){
  setInterval(sendHeartbeat, 10000);
}


// /shutdown route
app.post('/shutdown', (req, res) => {
  res.json({ message: 'Server shutting down...' });
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Basic route
app.get('/v1/api', (req, res) => {
  res.json({message: 'Welcome to my RESTful API'});
});

const server = app.listen(port, () => {
  config.workder.WORKER_PORT = server.address().port;
  console.log(`Server is running on http://localhost:${server.address().port}`);
});
