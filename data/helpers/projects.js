const router = require('express').Router();
const projectsDb = require('./projectModel.js');

// get,
// insert,
// update,
// remove,
// getProjectActions,

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

router.get('/:id', (req, res) => {
	const id = req.params.id;
	projectsDb
		.get(id)
		.then((project) => {
			if (!project) {
				res.status(404).json({ message: 'No project found with specified ID' });
			} else {
				res.status(200).json(project);
			}
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error retrieving the project' });
		});
});

module.exports = router;
