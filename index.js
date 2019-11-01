const express = require('express');
const server = express();
const projectRouter = require('./data/helpers/projects.js');

server.use(express.json());
server.use(logger);
server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
	res.send('Server is working');
});

const port = process.env.PORT || 4000;

server.listen(port, () => console.log(`\n=== server running on port ${port} ===\n`));

function logger(req, res, next) {
	console.log(`${new Date().toISOString()} ${req.method} to ${req.url} `);

	next();
}
