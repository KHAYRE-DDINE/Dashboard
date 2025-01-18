const jsonServer = require('json-server');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Path to your db.json file
const middlewares = jsonServer.defaults();

// Configure CORS to allow credentials and a specific origin
const corsOptions = {
  origin: 'http://localhost:3001', // Allow this origin
  credentials: true,              // Allow credentials
};

server.use(cors(corsOptions));
server.use(middlewares);
server.use(router);

// Start the JSON server
server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});
