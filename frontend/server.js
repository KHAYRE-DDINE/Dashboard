const jsonServer = require('json-server');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Allow requests from the React dev server (port 3000)
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: false,
};

server.use(cors(corsOptions));
server.use(middlewares);
server.use(router);

// JSON Server runs on port 3001 — React dev server uses 3000
server.listen(3001, () => {
  console.log('JSON Server is running on http://localhost:3001');
});
