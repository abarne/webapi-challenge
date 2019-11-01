const router = require('express').Router();
const actionsDb = require('./actionModel.js');

router.get('/', (req, res) => {
	actionsDb
		.get()
		.then((actions) => {
			res.status(200).json(actions);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ message: 'Error retrieving the actions.' });
		});
});

module.exports = router;
