const router = require('express').Router();
const projectsDb = require('./projectModel.js');

router.get('/', (req, res) => {
	projectsDb
		.get()
		.then((projects) => {
			res.status(200).json(projects);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ message: 'Error retrieving the projects.' });
		});
});

module.exports = router;
