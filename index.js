const express = require('express');
const server = express();

server.get('/', (req, res) => {
	res.send('Server is working');
});

const port = process.env.PORT || 4000;

server.listen(port, () => console.log(`\n=== server running on port ${port} ===\n`));
