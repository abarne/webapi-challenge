const express = require('express');
const server = express();
const projectRouter = require('./data/helpers/projects.js');
const actionRouter = require('./data/helpers/actions.js');

server.use(express.json());
server.use(logger);
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
	res.send('Server is working');
});

const port = process.env.PORT || 4000;

server.listen(port, () => console.log(`\n=== server running on port ${port} ===\n`));

function logger(req, res, next) {
	console.log(`${new Date().toISOString()} ${req.method} to ${req.url} `);

	next();
}
